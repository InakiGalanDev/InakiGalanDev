<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;

/**
 * Portada, casos de estudio y sitemap en es / ca / en.
 * Los idiomas y rutas salen de resources/js/i18n/site.json y los proyectos de
 * resources/js/data/projects.json, los mismos archivos que usa React.
 */
class PortfolioController extends Controller
{
    public static function site(): array
    {
        return json_decode(file_get_contents(resource_path('js/i18n/site.json')), true);
    }

    public static function projects(): array
    {
        return json_decode(file_get_contents(resource_path('js/data/projects.json')), true);
    }

    public static function homePath(array $site, string $locale): string
    {
        return $locale === $site['defaultLocale'] ? '/' : "/{$locale}";
    }

    public static function projectPath(array $site, string $locale, string $slug): string
    {
        $prefix = $locale === $site['defaultLocale'] ? '' : "/{$locale}";

        return "{$prefix}/{$site['locales'][$locale]['projectsPath']}/{$slug}";
    }

    public function home(Request $request): InertiaResponse
    {
        $site = self::site();
        $locale = $request->route('locale');
        $meta = $site['meta'][$locale];

        return $this->render('Home', $site, $locale, fn ($l) => self::homePath($site, $l), $meta);
    }

    public function project(Request $request): InertiaResponse
    {
        $site = self::site();
        $locale = $request->route('locale');
        $slug = $request->route('slug');
        $project = collect(self::projects())->firstWhere('slug', $slug);
        abort_unless($project, 404);

        $title = "{$project['title']} — {$site['meta'][$locale]['caseStudy']} | Iñaki Galan";
        $description = $project['summary'][$locale] ?? $project['summary'][$site['defaultLocale']];

        return $this->render(
            'Project',
            $site,
            $locale,
            fn ($l) => self::projectPath($site, $l, $slug),
            ['title' => $title, 'description' => $description, 'shareTitle' => $title, 'shareDescription' => $description],
            ['slug' => $slug],
        );
    }

    public function sitemap(): Response
    {
        $site = self::site();
        $locales = array_keys($site['locales']);

        // Cada página con sus versiones en los tres idiomas
        $pages = [fn ($l) => self::homePath($site, $l)];
        foreach (self::projects() as $project) {
            $pages[] = fn ($l) => self::projectPath($site, $l, $project['slug']);
        }

        $xml = '<?xml version="1.0" encoding="UTF-8"?>'."\n";
        $xml .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">'."\n";
        foreach ($pages as $pathFor) {
            foreach ($locales as $locale) {
                $xml .= "  <url>\n    <loc>".e($site['url'].$pathFor($locale))."</loc>\n";
                foreach ($locales as $alt) {
                    $xml .= '    <xhtml:link rel="alternate" hreflang="'.$alt.'" href="'.e($site['url'].$pathFor($alt)).'"/>'."\n";
                }
                $xml .= '    <xhtml:link rel="alternate" hreflang="x-default" href="'.e($site['url'].$pathFor($site['defaultLocale'])).'"/>'."\n";
                $xml .= "  </url>\n";
            }
        }
        $xml .= "</urlset>\n";

        return response($xml, 200, ['Content-Type' => 'application/xml']);
    }

    private function render(string $component, array $site, string $locale, callable $pathFor, array $meta, array $props = []): InertiaResponse
    {
        $alternates = collect($site['locales'])->keys()->mapWithKeys(fn ($l) => [$l => $pathFor($l)])->all();

        return Inertia::render($component, $props + [
            'locale' => $locale,
            'alternates' => $alternates,
            'pageTitle' => $meta['title'],
        ])->withViewData(['meta' => $meta + [
            'locale' => $locale,
            'ogLocale' => $site['locales'][$locale]['og'],
            'siteUrl' => $site['url'],
            'path' => $pathFor($locale),
            'alternates' => $alternates,
            'defaultLocale' => $site['defaultLocale'],
        ]]);
    }
}

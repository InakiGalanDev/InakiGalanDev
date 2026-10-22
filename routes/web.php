<?php

use App\Http\Controllers\PortfolioController;
use Illuminate\Support\Facades\Route;

$site = PortfolioController::site();

// es sin prefijo (/ y /proyectos/{slug}); ca y en con prefijo (/ca, /en/projects/{slug}...)
foreach ($site['locales'] as $locale => $info) {
    $prefix = $locale === $site['defaultLocale'] ? '' : "/{$locale}";

    Route::get($prefix ?: '/', [PortfolioController::class, 'home'])->defaults('locale', $locale);
    Route::get("{$prefix}/{$info['projectsPath']}/{slug}", [PortfolioController::class, 'project'])->defaults('locale', $locale);
}

Route::get('/sitemap.xml', [PortfolioController::class, 'sitemap']);

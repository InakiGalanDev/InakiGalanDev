<!DOCTYPE html>
<html lang="{{ $meta['locale'] ?? 'es' }}">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    @php
        // $meta llega de PortfolioController; los valores por defecto cubren cualquier otra vista
        $meta = $meta ?? [];
        $siteUrl = $meta['siteUrl'] ?? 'https://inakigalandev-main-i5kai4.laravel.cloud';
        $pageUrl = $siteUrl . ($meta['path'] ?? '/');
        $pageTitle = $meta['title'] ?? 'Iñaki Galan — Desarrollador Full Stack Laravel & React | España';
        $pageDescription = $meta['description'] ?? 'Desarrollador Full Stack especializado en Laravel y React. Creo aplicaciones web escalables, intranets a medida y productos digitales. Disponible para proyectos en España y remoto.';
        $shareTitle = $meta['shareTitle'] ?? $pageTitle;
        $shareDescription = $meta['shareDescription'] ?? $pageDescription;
        $alternates = $meta['alternates'] ?? [];
    @endphp

    <!-- SEO Principal -->
    <title>{{ $pageTitle }}</title>
    <meta name="description" content="{{ $pageDescription }}" />
    <meta name="keywords" content="programador full stack, desarrollador Laravel, programador React, desarrollador web España, programador PHP, aplicaciones web a medida, intranet empresarial, Iñaki Galan, IñakiGalanDev" />
    <meta name="author" content="Iñaki Galan" />
    <meta name="robots" content="index, follow" />
    <link rel="canonical" href="{{ $pageUrl }}" />
    @foreach ($alternates as $altLocale => $altPath)
    <link rel="alternate" hreflang="{{ $altLocale }}" href="{{ $siteUrl . $altPath }}" />
    @endforeach
    @if (isset($meta['defaultLocale'], $alternates[$meta['defaultLocale']]))
    <link rel="alternate" hreflang="x-default" href="{{ $siteUrl . $alternates[$meta['defaultLocale']] }}" />
    @endif

    <!-- Open Graph (para compartir en redes sociales) -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content="{{ $pageUrl }}" />
    <meta property="og:title" content="{{ $shareTitle }}" />
    <meta property="og:description" content="{{ $shareDescription }}" />
    <meta property="og:image" content="https://inakigalandev-main-i5kai4.laravel.cloud/img/og-image.jpg" />
    <meta property="og:locale" content="{{ $meta['ogLocale'] ?? 'es_ES' }}" />

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="{{ $shareTitle }}" />
    <meta name="twitter:description" content="{{ $shareDescription }}" />
    <meta name="twitter:image" content="https://inakigalandev-main-i5kai4.laravel.cloud/img/og-image.jpg" />

    <!-- Schema.org (datos estructurados para Google) -->
    <script type="application/ld+json">
        @verbatim
        {
          "@context": "https://schema.org",
          "@type": "Person",
          "name": "Iñaki Galan",
          "url": "https://inakigalandev-main-i5kai4.laravel.cloud/",
          "jobTitle": "Desarrollador Full Stack",
          "knowsAbout": ["Laravel", "React", "PHP", "MySQL", "TypeScript", "JavaScript", "Inertia.js"],
          "description": "Desarrollador Full Stack especializado en Laravel y React. Creo aplicaciones web escalables e intranets a medida para empresas.",
          "email": "inakigalandev@gmail.com",
          "nationality": "Spanish",
          "sameAs": [
            "https://github.com/InakiGalanDev"
          ]
        }
        @endverbatim
    </script>

    @viteReactRefresh
    @vite(['resources/js/app.jsx', 'resources/css/app.css'])
    @inertiaHead
</head>
<body>
    @inertia
</body>
</html>

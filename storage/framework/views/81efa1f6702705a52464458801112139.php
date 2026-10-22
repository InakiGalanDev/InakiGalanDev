<!DOCTYPE html>
<html lang="<?php echo e($meta['locale'] ?? 'es'); ?>">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <?php
        // $meta llega de PortfolioController; los valores por defecto cubren cualquier otra vista
        $meta = $meta ?? [];
        $siteUrl = $meta['siteUrl'] ?? 'https://inakigalandev-main-i5kai4.laravel.cloud';
        $pageUrl = $siteUrl . ($meta['path'] ?? '/');
        $pageTitle = $meta['title'] ?? 'Iñaki Galan — Desarrollador Full Stack Laravel & React | España';
        $pageDescription = $meta['description'] ?? 'Desarrollador Full Stack especializado en Laravel y React. Creo aplicaciones web escalables, intranets a medida y productos digitales. Disponible para proyectos en España y remoto.';
        $shareTitle = $meta['shareTitle'] ?? $pageTitle;
        $shareDescription = $meta['shareDescription'] ?? $pageDescription;
        $alternates = $meta['alternates'] ?? [];
    ?>

    <!-- SEO Principal -->
    <title><?php echo e($pageTitle); ?></title>
    <meta name="description" content="<?php echo e($pageDescription); ?>" />
    <meta name="keywords" content="programador full stack, desarrollador Laravel, programador React, desarrollador web España, programador PHP, aplicaciones web a medida, intranet empresarial, Iñaki Galan, IñakiGalanDev" />
    <meta name="author" content="Iñaki Galan" />
    <meta name="robots" content="index, follow" />
    <link rel="canonical" href="<?php echo e($pageUrl); ?>" />
    <?php $__currentLoopData = $alternates; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $altLocale => $altPath): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
    <link rel="alternate" hreflang="<?php echo e($altLocale); ?>" href="<?php echo e($siteUrl . $altPath); ?>" />
    <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
    <?php if(isset($meta['defaultLocale'], $alternates[$meta['defaultLocale']])): ?>
    <link rel="alternate" hreflang="x-default" href="<?php echo e($siteUrl . $alternates[$meta['defaultLocale']]); ?>" />
    <?php endif; ?>

    <!-- Open Graph (para compartir en redes sociales) -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content="<?php echo e($pageUrl); ?>" />
    <meta property="og:title" content="<?php echo e($shareTitle); ?>" />
    <meta property="og:description" content="<?php echo e($shareDescription); ?>" />
    <meta property="og:image" content="https://inakigalandev-main-i5kai4.laravel.cloud/img/og-image.jpg" />
    <meta property="og:locale" content="<?php echo e($meta['ogLocale'] ?? 'es_ES'); ?>" />

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="<?php echo e($shareTitle); ?>" />
    <meta name="twitter:description" content="<?php echo e($shareDescription); ?>" />
    <meta name="twitter:image" content="https://inakigalandev-main-i5kai4.laravel.cloud/img/og-image.jpg" />

    <!-- Schema.org (datos estructurados para Google) -->
    <script type="application/ld+json">
        
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
        
    </script>

    <?php echo app('Illuminate\Foundation\Vite')->reactRefresh(); ?>
    <?php echo app('Illuminate\Foundation\Vite')(['resources/js/app.jsx', 'resources/css/app.css']); ?>
    <?php $__inertiaSsrResponse = app(\Inertia\Ssr\SsrState::class)->setPage($page)->dispatch();  if ($__inertiaSsrResponse) { echo $__inertiaSsrResponse->head; } ?>
</head>
<body>
    <?php $__inertiaSsrResponse = app(\Inertia\Ssr\SsrState::class)->setPage($page)->dispatch();  if ($__inertiaSsrResponse) { echo $__inertiaSsrResponse->body; } else { ?><script data-page="app" type="application/json"><?php echo json_encode($page); ?></script><div id="app"></div><?php } ?>
</body>
</html>
<?php /**PATH /Users/inakigalan10/Desktop/Portfolio/resources/views/app.blade.php ENDPATH**/ ?>
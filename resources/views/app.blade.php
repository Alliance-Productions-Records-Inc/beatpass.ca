<!DOCTYPE html>
<html lang="en" class="dark" prefix="og: https://ogp.me/ns#">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    @php
        $isChangelog = ($page ?? 'landing') === 'changelog';

        $title = $isChangelog
            ? 'Changelog - BeatPass | Latest Updates & Release Notes'
            : 'BeatPass - Unlimited Beats for Artists | Professional Beat Library';

        $description = $isChangelog
            ? 'Stay up to date with the latest BeatPass features, improvements, and bug fixes. See what\'s new in the platform.'
            : 'Access unlimited professional beats with clear licensing. Download studio-quality beats, get commercial rights, and support real producers. First producer community-powered beat platform.';

        $canonicalUrl = $isChangelog
            ? 'https://beatpass.ca/changelog'
            : 'https://beatpass.ca/';

        $ogTitle = $isChangelog
            ? 'Changelog - BeatPass'
            : 'BeatPass - Unlimited Beats for Artists';

        $ogDescription = $isChangelog
            ? 'Latest updates, new features, and improvements to the BeatPass platform.'
            : 'The first producer community-powered beat platform. Unlimited beats, fresh uploads every month, one plan that replaces every transaction. This isn\'t just another subscription—it\'s how music creation should work.';

        $breadcrumbs = [
            ['@type' => 'ListItem', 'position' => 1, 'name' => 'Home', 'item' => 'https://beatpass.ca/'],
        ];
        if ($isChangelog) {
            $breadcrumbs[] = ['@type' => 'ListItem', 'position' => 2, 'name' => 'Changelog', 'item' => 'https://beatpass.ca/changelog'];
        }
    @endphp

    <!-- Primary Meta Tags -->
    <title>{{ $title }}</title>
    <meta name="title" content="{{ $title }}">
    <meta name="description" content="{{ $description }}">
    @if($isChangelog)
    <meta name="keywords" content="BeatPass changelog, updates, release notes, new features, bug fixes, platform improvements">
    @else
    <meta name="keywords" content="beats, music production, beat library, beat subscription, hip hop beats, rap beats, music licensing, unlimited downloads, producer community, BeatPass">
    @endif
    <meta name="author" content="BeatPass">
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
    
    <!-- Canonical URL -->
    <link rel="canonical" href="{{ $canonicalUrl }}">
    
    <!-- Sitemap -->
    <link rel="sitemap" type="application/xml" title="Sitemap" href="/sitemap.xml">

    <!-- DNS Prefetch for Performance -->
    <link rel="dns-prefetch" href="//open.beatpass.ca">
    <link rel="dns-prefetch" href="//blog.beatpass.ca">
    <link rel="dns-prefetch" href="//docs.beatpass.ca">
    <link rel="dns-prefetch" href="//f005.backblazeb2.com">

    <!-- Google Fonts - Roboto -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet">
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="{{ $canonicalUrl }}">
    <meta property="og:site_name" content="BeatPass">
    <meta property="og:title" content="{{ $ogTitle }}">
    <meta property="og:description" content="{{ $ogDescription }}">
    <meta property="og:image" content="https://f005.backblazeb2.com/file/bpass24/storage/Landing+page/Untitled+(2048+x+1080+px).jpg">
    <meta property="og:image:secure_url" content="https://f005.backblazeb2.com/file/bpass24/storage/Landing+page/Untitled+(2048+x+1080+px).jpg">
    <meta property="og:image:width" content="2048">
    <meta property="og:image:height" content="1080">
    <meta property="og:image:alt" content="{{ $ogTitle }} - Professional Music Production Platform">
    <meta property="og:locale" content="en_US">
    
    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:url" content="{{ $canonicalUrl }}">
    <meta name="twitter:title" content="{{ $ogTitle }}">
    <meta name="twitter:description" content="{{ $ogDescription }}">
    <meta name="twitter:image" content="https://f005.backblazeb2.com/file/bpass24/storage/Landing+page/Untitled+(2048+x+1080+px).jpg">
    <meta name="twitter:image:alt" content="{{ $ogTitle }} - Professional Music Production Platform">
    <meta name="twitter:creator" content="@beatpasswav">
    <meta name="twitter:site" content="@beatpasswav">
    
    <!-- Additional Meta Tags -->
    <meta name="theme-color" content="#48B0E4">
    <meta name="referrer" content="strict-origin-when-cross-origin">
    <meta name="mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
    <meta name="apple-mobile-web-app-title" content="BeatPass">
    <meta name="application-name" content="BeatPass">
    <meta name="msapplication-TileColor" content="#48B0E4">
    
    <!-- Icons -->
    <link rel="icon" type="image/svg+xml" href="/favicon.svg">
    <link rel="icon" type="image/png" href="/favicon.png">
    <link rel="apple-touch-icon" href="/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
    <link rel="manifest" href="/site.webmanifest">
    
    <!-- JSON-LD Structured Data - Organization -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": "https://beatpass.ca/#organization",
      "name": "BeatPass",
      "url": "https://beatpass.ca",
      "logo": {
        "@type": "ImageObject",
        "url": "https://beatpass.ca/logo.png",
        "width": "250",
        "height": "250"
      },
      "description": "The Beat Licensing Platform for producers and artists. Stream, download, and license professional beats.",
      "foundingDate": "2020",
      "slogan": "Where Beats Meet Opportunity",
      "sameAs": [
        "https://x.com/beatpasswav",
        "https://www.facebook.com/people/BeatPass/61559951854657/",
        "https://www.instagram.com/beatpass.wav",
        "https://www.youtube.com/channel/UCy3ohTlamVHmfcvt6LJqSJw",
        "https://www.tiktok.com/@beatpass.wav"
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "Customer Support",
        "email": "support@beatpass.ca",
        "availableLanguage": ["en"]
      },
      "subOrganization": [
        {
          "@type": "WebApplication",
          "name": "BeatPass Player",
          "url": "https://open.beatpass.ca",
          "description": "Stream and download unlimited professional beats"
        },
        {
          "@type": "WebSite",
          "name": "BeatPass Documentation",
          "url": "https://docs.beatpass.ca",
          "description": "Help center and developer documentation"
        },
        {
          "@type": "Blog",
          "name": "BeatPass Blog",
          "url": "https://blog.beatpass.ca",
          "description": "News, updates, and producer spotlights"
        }
      ]
    }
    </script>
    
    <!-- JSON-LD Structured Data - WebSite -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": "https://beatpass.ca/#website",
      "name": "BeatPass",
      "url": "https://beatpass.ca",
      "description": "The Beat Licensing Platform - Stream, download, and license professional beats from vetted producers.",
      "publisher": {
        "@id": "https://beatpass.ca/#organization"
      },
      "hasPart": [
        {
          "@type": "WebApplication",
          "name": "BeatPass Player",
          "url": "https://open.beatpass.ca",
          "applicationCategory": "MusicApplication",
          "operatingSystem": "Web Browser"
        },
        {
          "@type": "WebSite",
          "name": "BeatPass Documentation",
          "url": "https://docs.beatpass.ca"
        },
        {
          "@type": "Blog",
          "name": "BeatPass Blog",
          "url": "https://blog.beatpass.ca"
        }
      ],
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://open.beatpass.ca/search?query={search_term_string}"
        },
        "query-input": "required name=search_term_string"
      }
    }
    </script>
    
    <!-- JSON-LD Structured Data - Product/Service -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "BeatPass Subscription",
      "description": "Unlimited access to professional beats with commercial licensing. Download studio-quality beats and support real producers.",
      "image": [
        "https://f005.backblazeb2.com/file/bpass24/storage/Landing+page/Untitled+(2048+x+1080+px).jpg",
        "https://beatpass.ca/images/logo-white.png"
      ],
      "brand": {
        "@type": "Brand",
        "name": "BeatPass",
        "logo": "https://beatpass.ca/images/logo-white.png"
      },
      "category": "Music Production Software",
      "sku": "BEATPASS-SUB",
      "offers": [
        {
          "@type": "Offer",
          "name": "Classic Plan",
          "price": "29.00",
          "priceCurrency": "CAD",
          "availability": "https://schema.org/InStock",
          "url": "https://open.beatpass.ca/pricing",
          "priceValidUntil": "2026-12-31",
          "description": "Unlimited non-exclusive downloads. Built for independent artists ready to release."
        },
        {
          "@type": "Offer",
          "name": "Plus Plan",
          "price": "45.00",
          "priceCurrency": "CAD",
          "availability": "https://schema.org/InStock",
          "url": "https://open.beatpass.ca/pricing",
          "priceValidUntil": "2026-12-31",
          "description": "Your first custom beat, deeper discounts — the upgrade for creators."
        },
        {
          "@type": "Offer",
          "name": "Pro Plan",
          "price": "59.00",
          "priceCurrency": "CAD",
          "availability": "https://schema.org/InStock",
          "url": "https://open.beatpass.ca/pricing",
          "priceValidUntil": "2026-12-31",
          "description": "Custom beats, premium perks, max flexibility. For serious artists building careers."
        }
      ]
    }
    </script>
    
    <!-- JSON-LD Structured Data - FAQPage (This will be enhanced in FAQSection) -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is BeatPass and how does it work?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "BeatPass is a subscription-based platform offering unlimited access to professional beats with non-exclusive licensing. Download beats to receive legal authorization for use. For commercial releases, negotiate revenue splits and publishing rights directly with producers via chat or email."
          }
        },
        {
          "@type": "Question",
          "name": "What happens to my licenses if I cancel my subscription?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "All licenses obtained during your active subscription remain valid forever. You can continue to monetize and distribute songs created with those beats even after canceling. Your commercial rights never expire."
          }
        },
        {
          "@type": "Question",
          "name": "Are there really no download limits?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Correct. All paid plans include truly unlimited downloads with no hidden restrictions or fair-use policies. Download as many beats as you need every month without counting or tracking."
          }
        },
        {
          "@type": "Question",
          "name": "Can I monetize my songs on YouTube and streaming platforms?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Your non-exclusive license authorizes legal use of the beat for commercial releases. Revenue splits and publishing rights are negotiated directly with the producer via instant chat or email—BeatPass does not negotiate these terms on behalf of producers."
          }
        },
        {
          "@type": "Question",
          "name": "How do custom beat requests work?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Submit a detailed request describing your ideal beat. All producers on the platform are notified instantly and can submit beats matching your requirements within 24 hours. You review submissions and choose the perfect beat—all included in your plan."
          }
        },
        {
          "@type": "Question",
          "name": "What's the difference between plans?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "All plans include unlimited downloads and commercial licensing. Higher tiers offer more custom beat requests per month, bigger discounts on exclusive licenses, and priority support. Check the pricing table for specific features per plan."
          }
        },
        {
          "@type": "Question",
          "name": "When do I need to negotiate revenue splits with producers?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Only when releasing on streaming platforms (Spotify, Apple Music, etc.) where you earn royalties. For YouTube content, social media posts, and live performances, your subscription license covers usage. Revenue splits apply to streaming royalties that include the producer's share."
          }
        },
        {
          "@type": "Question",
          "name": "Does BeatPass take any hidden fees beyond my subscription?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No platform fees are added to what you pay each month. BeatPass keeps fifteen percent of overall subscription revenue to run the service; the rest goes to producers."
          }
        }
      ]
    }
    </script>
    
    <!-- JSON-LD Structured Data - BreadcrumbList -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": @json($breadcrumbs, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT)
    }
    </script>
    
    <!-- JSON-LD Structured Data - Site Navigation & Hierarchy -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "BeatPass Site Navigation",
      "description": "Main navigation and subdomain structure of BeatPass",
      "itemListElement": [
        {
          "@type": "SiteNavigationElement",
          "position": 1,
          "name": "Home",
          "description": "BeatPass landing page and overview",
          "url": "https://beatpass.ca"
        },
        {
          "@type": "SiteNavigationElement",
          "position": 2,
          "name": "Player App",
          "description": "BeatPass music player and beat discovery platform",
          "url": "https://open.beatpass.ca"
        },
        {
          "@type": "SiteNavigationElement",
          "position": 3,
          "name": "Blog",
          "description": "BeatPass blog with music production tips and news",
          "url": "https://blog.beatpass.ca"
        },
        {
          "@type": "SiteNavigationElement",
          "position": 4,
          "name": "Documentation",
          "description": "Help center, getting started guides, and release notes",
          "url": "https://docs.beatpass.ca"
        },
        {
          "@type": "SiteNavigationElement",
          "position": 5,
          "name": "Pricing",
          "description": "BeatPass subscription plans and pricing",
          "url": "https://open.beatpass.ca/pricing"
        },
        {
          "@type": "SiteNavigationElement",
          "position": 6,
          "name": "Discover Beats",
          "description": "Browse and discover professional beats",
          "url": "https://open.beatpass.ca/discover"
        }
      ]
    }
    </script>
    
    <!-- ColorThief for dynamic color extraction (optional — canvas fallback if unavailable) -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/color-thief/2.4.0/color-thief.umd.js" defer></script>

    @vite(['resources/css/app.css', 'resources/js/app.tsx'])
</head>
<body style="margin: 0; padding: 0; background: #0a0a0a;">
    <div id="root">
        <!-- Loading indicator -->
        <div style="display: flex; align-items: center; justify-content: center; min-height: 100vh; flex-direction: column; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;">
            <img src="/images/logo-white.png" alt="BeatPass" style="height: 60px; margin-bottom: 24px;">
            <div style="width: 60px; height: 60px; border: 4px solid rgba(175, 189, 207, 0.2); border-top-color: rgb(175, 189, 207); border-radius: 50%; animation: spin 1s linear infinite; margin-bottom: 16px;"></div>
            <p style="color: rgba(255, 255, 255, 0.65); font-size: 16px; margin: 0;">Loading BeatPass...</p>
        </div>
        <style>
            @keyframes spin {
                to { transform: rotate(360deg); }
            }
        </style>
    </div>
    <noscript>
        <div style="color: white; font-family: sans-serif; max-width: 800px; margin: 0 auto; padding: 50px 20px; line-height: 1.6;">
            <h1>BeatPass — Unlimited Beats for Artists</h1>
            <p>Access unlimited professional beats with clear licensing. Download studio-quality beats, get commercial rights, and support real producers.</p>
            <h2>How It Works</h2>
            <ol>
                <li><strong>Subscribe</strong> — Pick a plan that fits your creative pace.</li>
                <li><strong>License Instantly</strong> — Every download includes a non-exclusive commercial license.</li>
                <li><strong>Release Everywhere</strong> — Use your beats on streaming platforms, YouTube, and live performances.</li>
            </ol>
            <h2>Plans</h2>
            <ul>
                <li><strong>Classic — $29 CAD/mo</strong> — Unlimited non-exclusive downloads.</li>
                <li><strong>Plus — $45 CAD/mo</strong> — Custom beats and deeper discounts.</li>
                <li><strong>Pro — $59 CAD/mo</strong> — Custom beats, premium perks, max flexibility.</li>
            </ul>
            <h2>Quick Links</h2>
            <ul>
                <li><a href="https://open.beatpass.ca">Open BeatPass Player</a></li>
                <li><a href="https://open.beatpass.ca/pricing">View Pricing</a></li>
                <li><a href="https://blog.beatpass.ca">Read the Blog</a></li>
                <li><a href="https://docs.beatpass.ca">Documentation & Help</a></li>
                <li><a href="/changelog">Changelog</a></li>
            </ul>
            <p>© {{ date('Y') }} BeatPass. All rights reserved.</p>
        </div>
    </noscript>

    <!-- Start of OpenWidget (www.openwidget.com) code -->
    <script>
      window.__ow = window.__ow || {};
      window.__ow.organizationId = "b3302ecd-2723-4154-95ee-1468ed9f1e4a";
      window.__ow.integration_name = "manual_settings";
      window.__ow.product_name = "openwidget";   
      ;(function(n,t,c){function i(n){return e._h?e._h.apply(null,n):e._q.push(n)}var e={_q:[],_h:null,_v:"2.0",on:function(){i(["on",c.call(arguments)])},once:function(){i(["once",c.call(arguments)])},off:function(){i(["off",c.call(arguments)])},get:function(){if(!e._h)throw new Error("[OpenWidget] You can't use getters before load.");return i(["get",c.call(arguments)])},call:function(){i(["call",c.call(arguments)])},init:function(){var n=t.createElement("script");n.async=!0,n.type="text/javascript",n.src="https://cdn.openwidget.com/openwidget.js",t.head.appendChild(n)}};!n.__ow.asyncInit&&e.init(),n.OpenWidget=n.OpenWidget||e}(window,document,[].slice))
    </script>
    <noscript>You need to <a href="https://www.openwidget.com/enable-javascript" rel="noopener nofollow">enable JavaScript</a> to use the communication tool powered by <a href="https://www.openwidget.com/" rel="noopener nofollow" target="_blank">OpenWidget</a></noscript>
    <!-- End of OpenWidget code -->
</body>
</html>

<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="description" content="REX-BUSD daily busd miner">
        <meta property="og:title" content="REX-BUSD"/>
        <meta property="og:description" content="REX-BUSD daily busd miner"/>
        <meta property="twitter:title" content="REX-BUSD"/>
        <meta property="twitter:description" content="REX-BUSD daily busd miner"/>
        <meta property="og:image" content="{{asset('/images/T1.png')}}"/>
        <title>T-REX BUSD</title>
        <link rel="stylesheet" href="{{asset('css/app.css')}}">
        <script src="/js/web3.min.js"></script>
        <!-- Google tag (gtag.js) -->
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-LYRJYPW7VB"></script>
        <script>
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-LYRJYPW7VB');
        </script>
        @yield('style')
    </head>
    <body>
        @yield('body')
    </body>
    @yield('script')
    <script src="{{asset('js/app.js')}}"></script>
</html>
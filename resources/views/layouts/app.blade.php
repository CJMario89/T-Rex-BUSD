<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>T-REX BUSD</title>
        <link rel="stylesheet" href="{{asset('css/app.css')}}">
        <script src="/js/web3.min.js"></script>
        @yield('style')
    </head>
    <body>
        @yield('body')
    </body>
    @yield('script')
    <script src="{{asset('js/app.js')}}"></script>
</html>
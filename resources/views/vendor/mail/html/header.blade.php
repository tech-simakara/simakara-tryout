@props(['url'])
<tr>
<td class="header">
<a href="{{ $url }}" style="display: inline-block;">
@if (trim($slot) === 'Laravel')
<img src="https://laravel.com/img/notification-logo.png" class="logo" alt="Laravel Logo">
@else
<div align="center">
<img src="https://drive.google.com/thumbnail?id=1guadvQb11HhCv8rdAMdJ3Re0119msYah" class="logo" alt="SIMAKARA Logo" />
<span class="app-name">{{ $slot }}</span>
</div>
@endif
</a>
</td>
</tr>

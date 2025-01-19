<x-mail::message>
{{-- Greeting --}}
@if (! empty($greeting))
# {{ $greeting }}
@else
@if ($level === 'error')
# @lang('Uups!')
@else
# @lang('Halo!')
@endif
@endif

{{-- Intro Lines --}}
@foreach ($introLines as $line)
{{ $line }}

@endforeach

{{-- Action Button --}}
@isset($actionText)
<?php
    $color = match ($level) {
        'success',
		'error' => $level,
        default => 'primary',
    };
?>
<x-mail::button :url="$actionUrl" :color="$color">
{{ $actionText }}
</x-mail::button>
@endisset

{{-- Outro Lines --}}
@foreach ($outroLines as $line)
{{ $line }}

@endforeach

{{-- Salutation --}}
@if (! empty($salutation))
{{ $salutation }}
@else
<br>
<br>
<br>
@lang('Hormat Kami,')
<br>
<span class="salutation">{{ config('app.company') }}<span>
@endif

{{-- Subcopy --}}
@isset($actionText)
<x-slot:subcopy>
@lang(
	"Jika Anda mengalami kesulitan mengklik tombol \":actionText\", salin dan tempel URL berikut ini ke dalam browser Anda:",
    [
        'actionText' => $actionText,
    ]
)<br><span class="break-all">[{{ $displayableActionUrl }}]({{ $actionUrl }})</span>
</x-slot:subcopy>
@endisset
</x-mail::message>

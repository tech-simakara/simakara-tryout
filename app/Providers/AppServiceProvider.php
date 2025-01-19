<?php

namespace App\Providers;

use Illuminate\Auth\Notifications\VerifyEmail;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);

		VerifyEmail::toMailUsing(function (object $notifiable, string $url) {
			return (new MailMessage)
				->subject('Verifikasi Email')
				->greeting('Selamat Datang!')
				->line('Terima kasih telah bergabung dengan SIMAKARA Tryout. Kami senang menyambut Anda! Silakan klik tombol di bawah ini untuk memverifikasi email dan mengaktifkan akun Anda.')
				->action('Verifikasi Email', $url)
				->line('Jika Anda tidak membuat akun di SIMAKARA Tryout, tidak perlu melakukan tindakan lebih lanjut. Anda dapat mengabaikan email ini dengan aman.');
		});
    }
}

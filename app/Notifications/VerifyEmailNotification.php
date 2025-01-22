<?php

namespace App\Notifications;

use Illuminate\Auth\Notifications\VerifyEmail;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;

class VerifyEmailNotification extends VerifyEmail implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new notification instance.
     */
    public function __construct()
    {
        //
    }

	/**
	 * Get the verify email notification mail message for the given URL.
	 *
	 * @param  string  $url
	 * @return \Illuminate\Notifications\Messages\MailMessage
	 */
	protected function buildMailMessage($url): MailMessage
	{
		return (new MailMessage)
			->subject('Verifikasi Email')
			->greeting('Selamat Datang!')
			->line('Terima kasih telah bergabung dengan SIMAKARA Tryout. Kami senang menyambut Anda! Silakan klik tombol di bawah ini untuk memverifikasi email dan mengaktifkan akun Anda.')
			->action('Verifikasi Email', $url)
			->line('Jika Anda tidak membuat akun di SIMAKARA Tryout, tidak perlu melakukan tindakan lebih lanjut. Anda dapat mengabaikan email ini dengan aman.');
	}

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}

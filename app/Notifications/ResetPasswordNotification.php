<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ResetPasswordNotification extends Notification implements ShouldQueue
{
    use Queueable;

	protected string $url;

    /**
     * Create a new notification instance.
     */
    public function __construct($url)
    {
		$this->url = $url;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
			->subject('Reset Kata Sandi')
			->greeting('Selamat Datang Kembali!')
			->line('Kami menerima permintaan untuk mengatur ulang kata sandi akun Anda di SIMAKARA Tryout. Silakan klik tombol di bawah ini untuk melanjutkan proses pengaturan ulang kata sandi.')
			->action('Reset Kata Sandi', $this->url)
			->line('Jika Anda tidak mengubah kata sandi akun SIMAKARA Tryout, tidak perlu melakukan tindakan lebih lanjut. Anda dapat mengabaikan email ini dengan aman.');
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

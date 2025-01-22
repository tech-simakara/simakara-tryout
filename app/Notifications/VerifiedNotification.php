<?php

namespace App\Notifications;

use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class VerifiedNotification extends Notification implements ShouldQueue
{
    use Queueable;

	protected User $user;

    /**
     * Create a new notification instance.
     */
    public function __construct($user)
    {
        $this->user = $user;
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
			->subject('Pengguna Baru Terverifikasi')
			->greeting('Halo!')
			->line('Seorang pengguna baru telah berhasil memverifikasi alamat email mereka. Silakan periksa rincian pengguna di bawah ini.')
			->markdown('vendor.notifications.email', [
				'details' => [
					"Nama Lengkap: {$this->user->name}",
					"Email: {$this->user->email}",
					"Waktu Pendaftaran: {$this->user->created_at->translatedFormat('l, d F Y H:i:s')}",
					"Waktu Verifikasi: {$this->user->email_verified_at->translatedFormat('l, d F Y H:i:s')}"
				],
				'outroLines' => [
					'Jika Anda merasa aktivitas ini mencurigakan atau tidak dikenali, kami sangat menyarankan Anda untuk segera memeriksa informasi akun tersebut dan menghubungi tim dukungan kami untuk tindakan lebih lanjut.',
					'Terima kasih.'
				]
			]);
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

// src/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/', // DjangoバックエンドのURL
  withCredentials: true,             // 🍪 毎回自動でクッキー（JWT・CSRF）を送信する設定
});

// レスポンス（返ってきた結果）に対する割り込み処理（インターセプター）
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 「401エラー（期限切れ）」かつ「まだリフレッシュを試していない」場合
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // 無限ループ防止用のフラグ

      try {
        console.log('アクセストークン切れを検知。裏で自動リフレッシュ中...');

        // バックエンドのリフレッシュAPIを叩いて新しいクッキーをもらう
        const res = await axios.post('http://localhost:8000/api/token/refresh/', {}, {
        headers: {
        "Content-Type": "application/json",
        },
        withCredentials: true,
    },);

        console.log('リフレッシュ成功！失敗した通信を自動で再試行します。',res.data);
        
        // 新しいクッキーがセットされたので、失敗した元の通信をそのまま再実行して返します
        return api(originalRequest);

      } catch (refreshError) {
        console.error('リフレッシュトークンも切れています。ログイン画面へ移動してください。');
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;

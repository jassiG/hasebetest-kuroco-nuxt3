import { useStore } from '~/stores/authenticated'; // ここを修正

export default defineNuxtRouteMiddleware((to) => {
  if (process.server) return; // サーバーサイドで実行しない

  const store = useStore(); // クライアントサイドでのみ `useStore()` を呼び出す

  // 認証不要のパスを定義
  const publicPaths = ['/login'];

  // 認証不要のパスならそのまま通す
  if (publicPaths.some(path => to.path.startsWith(path))) {
    return;
  }

  // 認証されていなければログインページへリダイレクト
  if (!store.authenticated) {
    return navigateTo('/login');
  }
});

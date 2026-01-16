// IntersectionObserver を使用したフェードインアニメーション
(function() {
  'use strict';

  // アニメーション対象要素を取得
  const revealElements = document.querySelectorAll('.reveal');

  // IntersectionObserver の設定
  const observerOptions = {
    threshold: 0.15, // 15%が見えたら発火
    rootMargin: '0px 0px -50px 0px' // 少し早めに発火
  };

  // IntersectionObserver のコールバック
  const observerCallback = function(entries, observer) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        // 要素が見えたらクラスを追加
        entry.target.classList.add('is-in');
        // 一度発火したら監視を停止
        observer.unobserve(entry.target);
      }
    });
  };

  // IntersectionObserver のインスタンスを作成
  const observer = new IntersectionObserver(observerCallback, observerOptions);

  // 各要素を監視対象に追加
  revealElements.forEach(function(element) {
    observer.observe(element);
  });

  // prefers-reduced-motion が有効な場合はアニメーションを無効化
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    revealElements.forEach(function(element) {
      element.style.transition = 'none';
      element.classList.add('is-in');
    });
  }
})();

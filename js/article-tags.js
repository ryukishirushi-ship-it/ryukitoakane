// タグクリック機能
document.addEventListener('DOMContentLoaded', function() {
    const tags = document.querySelectorAll('.tag');
    tags.forEach(tag => {
        tag.style.cursor = 'pointer';
        tag.style.transition = 'background-color 0.3s ease, transform 0.2s ease';
        
        // ホバー効果
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
        
        // クリック機能
        tag.addEventListener('click', function() {
            const tagText = this.textContent.replace('#', '');
            // メインページの記事セクションに戻る
            window.location.href = '../index.html#blog';
        });
    });
});
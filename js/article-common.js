// 記事共通機能
document.addEventListener('DOMContentLoaded', function() {
    // メタ情報のクリック機能
    addMetaClickFunctionality();
    
    // YouTube動画セクションの統一
    standardizeVideoSections();
    
    // 記事内画像の遅延読み込み
    lazyLoadImages();
});

function addMetaClickFunctionality() {
    const metaItems = document.querySelectorAll('.blog-post-meta span');
    
    metaItems.forEach(item => {
        const icon = item.querySelector('i');
        const text = item.textContent.trim();
        
        // カテゴリタグの場合
        if (icon && icon.classList.contains('fa-folder')) {
            item.style.cursor = 'pointer';
            item.style.transition = 'color 0.3s ease';
            
            item.addEventListener('mouseenter', function() {
                this.style.color = 'var(--terracotta)';
            });
            
            item.addEventListener('mouseleave', function() {
                this.style.color = '';
            });
            
            item.addEventListener('click', function() {
                const category = text.replace(/.*\s/, ''); // アイコン部分を除去
                // カテゴリでフィルタリング
                window.location.href = `../index.html#blog?tag=${encodeURIComponent(category)}`;
            });
        }
        
        // 著者タグの場合
        if (icon && icon.classList.contains('fa-user')) {
            item.style.cursor = 'pointer';
            item.style.transition = 'color 0.3s ease';
            
            item.addEventListener('mouseenter', function() {
                this.style.color = 'var(--terracotta)';
            });
            
            item.addEventListener('mouseleave', function() {
                this.style.color = '';
            });
            
            item.addEventListener('click', function() {
                // 著者ページまたはすべての記事にリダイレクト
                window.location.href = '../index.html#blog';
            });
        }
    });
}

function standardizeVideoSections() {
    const videoSections = document.querySelectorAll('.youtube-section');
    
    videoSections.forEach(section => {
        // 統一されたスタイルを適用
        section.style.cssText = `
            background: linear-gradient(135deg, var(--beige) 0%, #E5D3A7 100%);
            padding: 25px;
            border-radius: 12px;
            margin: 30px 0;
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
            border: 1px solid rgba(191, 106, 57, 0.1);
        `;
        
        const heading = section.querySelector('h3');
        if (heading) {
            heading.style.cssText = `
                color: var(--terracotta);
                margin-bottom: 15px;
                font-size: 1.2rem;
                font-weight: 600;
                display: flex;
                align-items: center;
                gap: 8px;
            `;
        }
        
        const videoContainer = section.querySelector('.video-container');
        if (videoContainer) {
            videoContainer.style.cssText = `
                position: relative;
                width: 100%;
                max-width: 100%;
                height: 0;
                padding-bottom: 56.25%;
                margin-top: 15px;
                border-radius: 8px;
                overflow: hidden;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            `;
            
            const iframe = videoContainer.querySelector('iframe');
            if (iframe) {
                iframe.style.cssText = `
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    border: none;
                `;
            }
        }
    });
}

function lazyLoadImages() {
    const images = document.querySelectorAll('img[src*="source.unsplash.com"], img[src*="youtube.com"]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.transition = 'opacity 0.3s ease';
                img.style.opacity = '0';
                
                img.onload = () => {
                    img.style.opacity = '1';
                };
                
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// 関連記事サムネイル統一機能
function standardizeRelatedArticles() {
    const relatedImages = document.querySelectorAll('.related-img img, .related-card img');
    
    relatedImages.forEach(img => {
        img.style.cssText = `
            width: 100%;
            height: 200px;
            object-fit: cover;
            border-radius: 8px 8px 0 0;
        `;
    });
    
    const relatedItems = document.querySelectorAll('.related-item, .related-card');
    relatedItems.forEach(item => {
        item.style.cssText = `
            display: block;
            text-decoration: none;
            background: white;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            overflow: hidden;
        `;
        
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
        });
    });
}

// 初期化時に関連記事も統一
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(standardizeRelatedArticles, 100);
});
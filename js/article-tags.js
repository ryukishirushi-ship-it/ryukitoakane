// タグクリック機能とフィルタリング
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
        
        // クリック機能 - タグでフィルタリング
        tag.addEventListener('click', function() {
            const tagText = this.textContent.replace('#', '').trim();
            // タグパラメータ付きでメインページに遷移
            window.location.href = `../index.html#blog?tag=${encodeURIComponent(tagText)}`;
        });
    });
});

// メインページでのタグフィルタリング機能
if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
    document.addEventListener('DOMContentLoaded', function() {
        // URLパラメータからタグを取得
        const urlParams = new URLSearchParams(window.location.hash.split('?')[1] || '');
        const filterTag = urlParams.get('tag');
        
        if (filterTag) {
            filterArticlesByTag(filterTag);
            showTagFilterNotice(filterTag);
        }
        
        // 記事カード全体をクリック可能にする
        makeCardsClickable();
        
        // フィルタリング後のレイアウト調整は既存CSSクラスで対応
    });
    
    function filterArticlesByTag(tag) {
        const articles = document.querySelectorAll('.featured-card');
        const featuredContent = document.querySelector('.featured-content');
        let visibleCount = 0;
        
        articles.forEach(card => {
            const articleTags = getArticleTags(card);
            if (articleTags.includes(tag)) {
                card.style.display = 'block';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });
        
        // フィルタリング結果に応じてレイアウトクラスを適用
        if (featuredContent) {
            featuredContent.classList.add('filtered');
            if (visibleCount === 1) {
                featuredContent.classList.add('single-item');
            } else {
                featuredContent.classList.remove('single-item');
            }
        }
        
        // 結果が0件の場合の処理
        if (visibleCount === 0) {
            showNoResultsMessage(tag);
        }
    }
    
    function getArticleTags(card) {
        const title = card.querySelector('h3').textContent;
        const description = card.querySelector('p').textContent;
        
        // 記事タイトルと説明からタグを推定（実際の実装では記事のメタデータを使用）
        const tagMap = {
            '河津桜': ['河津桜', '河津桜まつり', '春旅行', '静岡旅行', '今井荘', '伊豆旅行', 'オールインクルーシブ', 'オーシャンビュー', '温泉旅行', '踊り子号'],
            'ANA': ['オーシャンビュー', '沖縄旅行', 'リゾート', '万座'],
            '宮古島': ['オーシャンビュー', '沖縄旅行', 'リゾート', 'イラフSUI'],
            '別府': ['温泉旅行', '九州旅行', '大分旅行'],
            'ガレリア': ['アート', '隠れ家', 'リゾート', '美土原'],
            '西表島': ['離島', '沖縄旅行', '自然', '水牛車', '由布島']
        };
        
        let tags = ['車なし旅行', '夫婦旅']; // 共通タグ
        
        Object.keys(tagMap).forEach(key => {
            if (title.includes(key) || description.includes(key)) {
                tags = tags.concat(tagMap[key]);
            }
        });
        
        return tags;
    }
    
    function showTagFilterNotice(tag) {
        const blogSection = document.querySelector('#blog .container');
        const notice = document.createElement('div');
        notice.className = 'tag-filter-notice';
        notice.style.cssText = `
            background: var(--beige);
            padding: 15px 20px;
            border-radius: 10px;
            margin-bottom: 20px;
            text-align: center;
            font-weight: 500;
        `;
        notice.innerHTML = `
            <span>「#${tag}」でフィルタリング中</span>
            <button onclick="clearFilter()" style="margin-left: 15px; padding: 5px 15px; background: var(--terracotta); color: white; border: none; border-radius: 5px; cursor: pointer;">全て表示</button>
        `;
        
        const existingNotice = blogSection.querySelector('.tag-filter-notice');
        if (existingNotice) {
            existingNotice.remove();
        }
        
        blogSection.insertBefore(notice, blogSection.querySelector('.featured-content'));
    }
    
    function showNoResultsMessage(tag) {
        const featuredContent = document.querySelector('.featured-content');
        const message = document.createElement('div');
        message.className = 'no-results-message';
        message.style.cssText = `
            text-align: center;
            padding: 40px;
            color: var(--terracotta);
            font-size: 1.1rem;
        `;
        message.innerHTML = `
            <p>「#${tag}」に関連する記事が見つかりませんでした。</p>
            <button onclick="clearFilter()" style="margin-top: 15px; padding: 10px 20px; background: var(--terracotta); color: white; border: none; border-radius: 5px; cursor: pointer;">全ての記事を表示</button>
        `;
        featuredContent.appendChild(message);
    }
    
    function makeCardsClickable() {
        const cards = document.querySelectorAll('.featured-card');
        cards.forEach(card => {
            card.style.cursor = 'pointer';
            card.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
            
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px)';
                this.style.boxShadow = '0 10px 25px rgba(0,0,0,0.1)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.05)';
            });
            
            card.addEventListener('click', function(e) {
                // read-moreボタンがクリックされた場合は通常の処理
                if (e.target.closest('.read-more')) {
                    return;
                }
                
                // カード全体がクリックされた場合
                const readMoreLink = this.querySelector('.read-more');
                if (readMoreLink) {
                    window.location.href = readMoreLink.href;
                }
            });
        });
    }
    
    // adjustFilteredLayout関数は削除（既存CSSで対応）
    
    // フィルタクリア関数をグローバルスコープに
    window.clearFilter = function() {
        const featuredContent = document.querySelector('.featured-content');
        if (featuredContent) {
            featuredContent.classList.remove('filtered', 'single-item');
        }
        window.location.href = '#blog';
        location.reload();
    }
}
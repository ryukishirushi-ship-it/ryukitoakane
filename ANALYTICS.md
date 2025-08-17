# Analytics Setup Documentation

## Google Analytics 4 Implementation

### Current Status
- ✅ Google Analytics 4 code added to all pages
- ✅ Placeholder `G-MEASUREMENT_ID` ready for actual tracking ID
- ✅ Existing Cloudflare Analytics detected on some pages

### Setup Instructions

1. **Create Google Analytics Property**
   - Go to [Google Analytics](https://analytics.google.com/)
   - Create a new GA4 property for `ryukiandakane.com`
   - Get your Measurement ID (format: G-XXXXXXXXXX)

2. **Update Tracking Code**
   - Replace all instances of `G-MEASUREMENT_ID` with your actual Measurement ID
   - This appears in both `index.html` and all article files

3. **Search and Replace Command**
   ```bash
   find . -name "*.html" -exec sed -i 's/G-MEASUREMENT_ID/G-YOUR-ACTUAL-ID/g' {} \;
   ```

### Current Analytics Coverage

#### Main Page
- Location: `index.html` (lines 27-34)
- Tracks: Page views, user interactions, navigation

#### Article Pages
All 7 articles have GA4 tracking:
- `01_iriomote_yubujima_article.html` (Date: 2025.01.10)
- `02_galleria_midobara_article.html` (Date: 2024.07.15)
- `03_beppu_onsen_article.html` (Date: 2024.07.27)
- `04_kawazu_sakura_imaiso_article.html` (Date: 2025.04.07)
- `05_miyakojima_iraph_sui_article.html` (Date: 2024.12.27)
- `06_ana_manza_article.html` (Date: 2024.06.15)
- `07_omo5_okinawa_naha_article.html` (Date: 2025.05.05)

### Article Date Analysis

#### Date Standards
The publication dates follow this pattern:
- **YYYY.MM.DD format** (Japanese style)
- **Mixed years**: 2024 and 2025
- **Seasonal relevance**: Dates align with travel seasons

#### Date Distribution
- **2024 Articles**: 4 articles (Galleria: Jul, Beppu: Jul, Miyakojima: Dec, ANA Manza: Jun)
- **2025 Articles**: 3 articles (Iriomote: Jan, Kawazu: Apr, OMO5: May)

#### Date Logic
- **Spring**: Kawazu cherry blossoms (April)
- **Summer**: Galleria and Beppu (July)
- **Winter**: Miyakojima (December), Iriomote (January)
- **Golden Week**: OMO5 (May 5th - Children's Day)

### Additional Analytics

#### Existing Cloudflare Analytics
Some articles already have Cloudflare Web Analytics:
- Token: `4edd5f8ec12a48cfa682ab8261b80a79`
- This provides additional insights alongside GA4

### Recommended Tracking Events

1. **Article Engagement**
   - Reading time
   - Scroll depth
   - Related article clicks

2. **Navigation**
   - Menu interactions
   - Tag filtering usage
   - YouTube video clicks

3. **Performance**
   - Page load times
   - Mobile vs desktop usage
   - Geographic distribution

### Privacy Considerations

- Consider adding a privacy policy page
- GDPR compliance for EU visitors
- Cookie consent banner if required
- Data retention settings in GA4

### Next Steps

1. **Replace placeholder Measurement ID** - See [GOOGLE_ANALYTICS_SETUP.md](GOOGLE_ANALYTICS_SETUP.md)
2. **Test tracking in GA4 Real-Time reports** - See [ANALYTICS_VERIFICATION.md](ANALYTICS_VERIFICATION.md)
3. **Learn to read GA4 dashboard** - See [GA4_DASHBOARD_GUIDE.md](GA4_DASHBOARD_GUIDE.md)
4. Set up conversion goals (newsletter signup, video views)
5. Configure custom events for better insights
6. Create automated reports for content performance

## 📚 Complete Guide Collection

- 📖 **[GOOGLE_ANALYTICS_SETUP.md](GOOGLE_ANALYTICS_SETUP.md)** - Step-by-step setup guide
- 📊 **[GA4_DASHBOARD_GUIDE.md](GA4_DASHBOARD_GUIDE.md)** - How to read analytics data
- ✅ **[ANALYTICS_VERIFICATION.md](ANALYTICS_VERIFICATION.md)** - Verify tracking works
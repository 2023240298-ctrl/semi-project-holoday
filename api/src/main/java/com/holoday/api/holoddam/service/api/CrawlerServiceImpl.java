package com.holoday.api.holoddam.service.api;


import com.holoday.api.holoddam.dto.api.CrawlResult;
import lombok.extern.slf4j.Slf4j;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class CrawlerServiceImpl {
    public CrawlResult extractText(String url){
        if (url == null || url.isBlank()) return null;

        if (url.contains("news.naver.com")) return extractNews(url);
        return extractGenericWeb(url);
    }

    private CrawlResult extractNews(String url){
        try{
            Document doc = Jsoup.connect(url)
                    .userAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36")
                    .timeout(5000)
                    .get();

            String imageUrl = extractImageUrl(doc);

            String fullText = doc.select("#newsct_article").text();
            if (fullText.isEmpty()){
                fullText = doc.select("#articleBodyContents").text();
            }
            String cleanedText= cleanNewsNoise(fullText);

            return new CrawlResult(cleanedText, imageUrl);

        } catch (Exception e){
            log.error(e.getMessage());
            return null;
        }
    }

    private CrawlResult extractGenericWeb(String url){
        try{
            Document doc = Jsoup.connect(url)
                    .userAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36")
                    .timeout(5000)
                    .get();

            String imageUrl = extractImageUrl(doc);

            String text = doc.select(".entry-content, .tt_article_useless_p_margin, article").text();

            if (text.isBlank()){
                StringBuilder sb = new StringBuilder();
                for (Element p:doc.select("p")){
                    sb.append(p.text()).append(" ");
                }
                text = sb.toString();
            }
            String fullText = text.replaceAll("\\s+", " ").trim();

            return new CrawlResult(fullText, imageUrl);

        } catch (Exception e){
            log.error(e.getMessage());
            return null;
        }
    }



    private String cleanNewsNoise(String text){
        if (text==null||text.isBlank()) return "";
        return text.replaceAll("\\[.*?\\]", "")
                .replaceAll("[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}", "")
                .replaceAll("ⓒ.*?금지", "")
                .replaceAll("\\s+", " ")
                .trim();
    }

    private String extractImageUrl(Document doc){
        String imageUrl = doc.select("meta[property=og:image]").attr("content");
        if (imageUrl.isBlank()){
            imageUrl = doc.select("meta[name=twitter:image]").attr("content");
        }
        if (imageUrl.isBlank()){
            Element img = doc.select("article img, #newsct_article img, .entry-content img, img").first();
            if(img !=null){
                imageUrl = img.attr("abs:src");
            }
        }
        return imageUrl != null ? imageUrl: "";
    }
}

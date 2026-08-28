package com.holoday.api.holoddam.service;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.springframework.stereotype.Service;

@Service
public class CrawlerServiceImpl {
    public String extractText(String url){
        if (url == null || url.isBlank()) return null;

        if (url.contains("news.naver.com")) return extractNews(url);
        return extractGenericWeb(url);
    }

    private String extractNews(String url){
        try{
            Document doc = Jsoup.connect(url)
                    .userAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36")
                    .timeout(5000)
                    .get();

            String fullText = doc.select("#newsct_article").text();
            if (fullText.isEmpty()){
                fullText = doc.select("#articleBodyContents").text();
            }
            return cleanNewsNoise(fullText);
        } catch (Exception e){
            return null;
        }
    }

    private String extractGenericWeb(String url){
        try{
            Document doc = Jsoup.connect(url)
                    .userAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36")
                    .timeout(5000)
                    .get();

            String text = doc.select(".entry-content, .tt_article_useless_p_margin, article").text();

            if (text.isBlank()){
                StringBuilder sb = new StringBuilder();
                for (Element p:doc.select("p")){
                    sb.append(p.text()).append(" ");
                }
                text = sb.toString();
            }
            return text.replaceAll("\\s+", " ").trim();

        } catch (Exception e){
            return null;
        }
    }

    private String cleanNewsNoise(String text){
        if (text == null) return "";
        return text.replaceAll("\\[.*?\\]", "")
                .replaceAll("[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}", "")
                .replaceAll("ⓒ.*?금지", "")
                .replaceAll("\\s+", " ")
                .trim();
    }
}

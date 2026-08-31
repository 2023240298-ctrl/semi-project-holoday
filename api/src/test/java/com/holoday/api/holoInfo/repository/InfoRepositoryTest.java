package com.holoday.api.holoInfo.repository;

import com.holoday.api.holoinfo.entity.Info;
import com.holoday.api.holoinfo.repository.InfoRepository;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.data.jpa.test.autoconfigure.DataJpaTest;
import org.springframework.boot.jdbc.test.autoconfigure.AutoConfigureTestDatabase;
import org.springframework.test.annotation.Rollback;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@Slf4j
public class InfoRepositoryTest {
    @Autowired
    private InfoRepository infoRepository;

    private void printInfo(Info info){
        log.info("게시글 번호: {}" , info.getInfoNo());
        log.info("작성자: {}", info.getUserId());
        log.info("카테고리: {}", info.getCategoryNo());
        log.info("날짜: {}", info.getInfoDate());
        log.info("게시글 조회 수 :{}", info.getInfoHit());
        log.info("제목: {}", info.getInfoTitle());
        log.info("글내용: {}", info.getInfoContent());
        log.info("장소: {}", info.getInfoPlace());
        log.info("주소: {}", info.getInfoAddress());
        log.info("좋아요 수: {}", info.getInfoLike());
        log.info("이미지: {}", info.getInfoImg());
        log.info("썸네일: {}", info.getInfoSimg());
    }
    @Test
    public void testRead() {
        Info info = infoRepository.findById(21L)
                .orElseThrow(() ->
                        new IllegalArgumentException());

        printInfo(info);
    }

    @Test
    public void testUpdate() {

        Info info = infoRepository.findById(21L).orElseThrow();

        info.changeInfoTitle("수정 테스트 제목");
        info.changeInfoContent("수정 테스트 내용");
        info.changeInfoPlace("망원한강공원");
        info.changeInfoAddress("서울 마포구");

        infoRepository.save(info);

        printInfo(info);
    }

    @Test
    public void testDelete(){
        Long infoNo = 21L;
        if(infoRepository.existsById(infoNo)){
            infoRepository.deleteById(infoNo);
            log.info("{}번 게시글을 삭제했습니다.", infoNo);
        } else {
            log.info("{}번 게시글이 존재하지 않습니다.",infoNo);
        }
    }

}

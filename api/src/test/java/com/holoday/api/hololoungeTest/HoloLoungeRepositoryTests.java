package com.holoday.api.hololoungeTest;

import com.holoday.api.hololounge.entity.HoloLounge;
import com.holoday.api.hololounge.repository.HoloLoungeRepository;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.data.jpa.test.autoconfigure.DataJpaTest;
import org.springframework.boot.jdbc.test.autoconfigure.AutoConfigureTestDatabase;
import org.springframework.test.annotation.Commit;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@Slf4j
public class HoloLoungeRepositoryTests {
    @Autowired
    private HoloLoungeRepository holoLoungeRepository;

    private void printHoloLounge(HoloLounge holoLounge){
        log.info("카테고리 번호: {}", holoLounge.getCategoryNo());
        log.info("회원 아이디: {}", holoLounge.getUserId());
        log.info("게시글 제목: {}", holoLounge.getBoardTitle());
        log.info("내용: {}", holoLounge.getBoardContent());
        log.info("서브내용: {}", holoLounge.getBoardScontent());
        log.info("이미지: {}", holoLounge.getBoardImg());
        log.info("썸네일: {}", holoLounge.getBoardSimg());
        log.info("날짜: {}", holoLounge.getBoardDate());
    }

    @Test
    @Commit
    public void testInsertDummyData() {
        String[] titles = {"하루종일 카페에 앉아 책을 읽었습니다.", "산책 다녀왔습니다. 날씨가 정말 좋아요!," +
                "그냥 아무것도 안 하고 쉰 날~ 힐링!"};
        for (int i = 1; i <= 100; i++) {
            HoloLounge holoLounge = new HoloLounge(
                    1L,
                    "alstn11",
                    titles[(int) (Math.random() * titles.length)] + "..." + i,
                    "이렇게 보내는 하루도 좋네요. 모두 즐거운 하루 보내세요~!",
                    "00",
                    "이미지",
                    "썸네일"
            );
            holoLoungeRepository.save(holoLounge);
        }
    }

    @Test
    public void testRead() {
        Long no = 240L;
        HoloLounge holoLounge = holoLoungeRepository.findById(no)
                .orElseThrow(()->
                        new IllegalArgumentException(no + "번 게시글이 존재하지 않습니다."));

        log.info("게시글 조회({}):",no);
        printHoloLounge(holoLounge);
    }


    @Test
    @Commit
    public void testUpdate() {
        Long no = 240L;
        HoloLounge holoLounge = holoLoungeRepository.findById(no)
                .orElseThrow(()->
                        new IllegalArgumentException(no + "번 게시글이 존재하지 않습니다."));

        holoLounge.updateDate(2L, "근교로 여행을 한 번 다녀와 봤습니다.", "오늘은 산책 삼아 가까운 도시로 여행을 다녀와 봤습니다. 새로운 볼거리들이 많네요. 좋아요.",
                "짧은 여행 소식", "바뀐 이미지","바뀐 썸네일");
        printHoloLounge(holoLounge);
    }

    @Test
    @Commit
    public void testDelete() {
        Long no = 301L;
        if(holoLoungeRepository.existsById(no)) {
            holoLoungeRepository.deleteById(no);
            log.info("{}번 게시글을 삭제했습니다.",no);
        } else {
            log.info("{}번 게시글이 존재하지 않습니다.", no);
        }
    }

}
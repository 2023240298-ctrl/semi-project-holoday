package com.holoday.api.hololoungeTest;

import com.holoday.api.common.pagination.PageRequestDTO;
import com.holoday.api.common.pagination.PageResponseDTO;
import com.holoday.api.hololounge.dto.HoloLoungeDTO;
import com.holoday.api.hololounge.service.HoloLoungeService;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Commit;

import java.nio.charset.StandardCharsets;
import java.time.LocalDate;

@SpringBootTest
@Slf4j
public class HoloLoungeServiceTests {
    @Autowired
    private HoloLoungeService holoLoungeService;

    @Test
    @Commit
    public void testRegister() {
        HoloLoungeDTO holoLoungeDTO = new HoloLoungeDTO();
        holoLoungeDTO.setCategoryNo(2L);
        holoLoungeDTO.setUserId("alstn11");
        holoLoungeDTO.setBoardTitle("새로 나온 신작 게임을 해봤습니다.");
        holoLoungeDTO.setBoardContent("처음 접해 보는 장르라서 조금 걱정이 됐는데 의외로 재미있게 할 수 있었습니다. 다들 겁먹지 말고 한 번 도전해 보세요~!");
        holoLoungeDTO.setBoardScontent("게임 추천입니다~!");
        holoLoungeDTO.setBoardImg("게임 이미지");
        holoLoungeDTO.setBoardSimg("게임 이미지 썸네일");
        holoLoungeDTO.setBoardDate(LocalDate.now().plusDays(3));

        Long no = holoLoungeService.register(holoLoungeDTO);
        log.info("등록된 번호: {}", no);
    }

    private void printHoloLounge(HoloLoungeDTO holoLoungeDTO) {
        log.info("게시물: {} {} {} {} {} {} {} {}",
                holoLoungeDTO.getCategoryNo(),
                holoLoungeDTO.getUserId(),
                holoLoungeDTO.getBoardTitle(),
                holoLoungeDTO.getBoardContent(),
                holoLoungeDTO.getBoardScontent(),
                holoLoungeDTO.getBoardImg(),
                holoLoungeDTO.getBoardSimg(),
                holoLoungeDTO.getBoardDate());
    }

    @Test
    @Commit
    public void testGet() {
        Long no = 302L;
        HoloLoungeDTO holoLoungeDTO = holoLoungeService.get(no);
        printHoloLounge(holoLoungeDTO);
    }

    @Test
    @Commit
    public void testModify() {
        Long no = 299L;
        HoloLoungeDTO holoLoungeDTO = holoLoungeService.get(no);

        holoLoungeDTO.setCategoryNo(2L);
        holoLoungeDTO.setBoardTitle("여행 계획을 세워봤습니다");
        holoLoungeDTO.setBoardContent("새 여행에 돌입하면서 계획을 한 번 세워봤습니다. 여행 계획이 적절한지 한 번만 봐주세요. 부모님 모시고 가는 거라 너무 급한 일정은 없었으면 좋겠네요.");
        holoLoungeDTO.setBoardScontent("여행 일정, 조언 구합니다.");
        holoLoungeDTO.setBoardImg("계획표 이미지");
        holoLoungeDTO.setBoardSimg("계획표 썸네일");

        holoLoungeService.modify(holoLoungeDTO);
        printHoloLounge(holoLoungeDTO);
    }

    @Test
    @Commit
    public void testRemove() {
        Long no = 297L;
        holoLoungeService.remove(no);
    }

    @Test
    public void testList() {
        PageRequestDTO pageRequestDTO = new PageRequestDTO();
        pageRequestDTO.setPage(1);
        pageRequestDTO.setSize(10);

        PageResponseDTO<HoloLoungeDTO> pageResponseDTO = holoLoungeService.list(pageRequestDTO);
        pageResponseDTO.getDtoList().forEach(this::printHoloLounge);
    }
}

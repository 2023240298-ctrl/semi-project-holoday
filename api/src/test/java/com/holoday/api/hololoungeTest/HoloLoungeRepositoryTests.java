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

        HoloLounge[] holoLounges = {

                new HoloLounge(
                        1L,
                        "alstn11",
                        "혼자 영화관에 다녀온 저녁",
                        "퇴근하고 집에 바로 들어가기 아쉬워서 평일 저녁에 혼자 영화관에 다녀왔어요.\n\n팝콘 하나 사서 조용히 영화를 보고 나오니 하루가 깔끔하게 마무리된 느낌이었습니다.\n\n영화가 끝난 뒤에는 천천히 주변을 걸으며 여운을 즐겼어요.",
                        "평일 저녁 혼자 영화 보기",
                        null,
                        null
                ),

                new HoloLounge(
                        3L,
                        "alstn11",
                        "아무 계획 없이 보낸 토요일",
                        "이번 토요일에는 일부러 아무런 약속도 잡지 않았습니다.\n\n늦잠을 자고 천천히 아침을 먹은 다음 집을 정리하고, 오후에는 보고 싶었던 드라마를 몰아서 봤어요.\n\n평소에는 주말에도 뭔가 해야 한다는 생각이 있었는데 하루 정도는 이렇게 아무것도 하지 않아도 괜찮겠다는 생각이 들었습니다.",
                        "아무것도 하지 않는 것도 휴식이네요",
                        null,
                        null
                ),

                new HoloLounge(
                        2L,
                        "alstn11",
                        "혼자 도자기 만들기에 도전했어요",
                        "평소 만들어보는 활동을 좋아해서 이번에는 혼자 도자기 공방에 다녀왔습니다.\n\n처음에는 생각보다 흙을 다루는 게 어려웠지만 선생님께서 하나씩 알려주셔서 천천히 따라갈 수 있었어요.\n\n모양이 조금 삐뚤어지긴 했지만 직접 만든 그릇이라고 생각하니 꽤 마음에 들었습니다.",
                        "처음 도전해본 도자기 체험",
                        null,
                        null
                ),

                new HoloLounge(
                        1L,
                        "alstn11",
                        "주말에 혼자 미술관을 돌아봤어요",
                        "이번 주말에는 평소 관심만 가지고 있던 전시를 보러 혼자 미술관에 다녀왔습니다.\n\n친구와 함께 가면 서로의 감상에 맞춰 움직이게 되는데, 혼자 가니까 마음에 드는 작품 앞에서 오래 머물 수 있어서 좋았어요.\n\n작품 설명도 하나씩 천천히 읽으면서 돌아보니 생각보다 시간이 금방 지나갔습니다.",
                        "천천히 전시를 둘러본 하루",
                        null,
                        null
                ),

                new HoloLounge(
                        3L,
                        "alstn11",
                        "혼자 카페에서 조용히 책 읽기",
                        "요즘 조금 정신없이 지내서 오랜만에 조용한 시간을 보내려고 카페에 갔습니다.\n\n사람이 너무 많은 곳보다는 조용한 카페를 찾아서 창가 자리에 앉았어요.\n\n커피 한 잔을 주문하고 책을 읽다 보니 어느새 두 시간이 지나 있었습니다. 특별한 일을 하지 않아도 이렇게 혼자 있는 시간이 생각보다 큰 휴식이 되는 것 같아요.",
                        "조용하게 나만의 시간을 보내기",
                        null,
                        null
                ),

                new HoloLounge(
                        2L,
                        "alstn11",
                        "혼자 베이킹 원데이 클래스를 다녀왔습니다",
                        "주말에 특별히 할 일이 없어서 베이킹 원데이 클래스를 신청했습니다.\n\n혼자 신청한 사람이 저밖에 없을까 봐 걱정했는데 의외로 혼자 온 분들이 몇 명 더 있었어요.\n\n반죽부터 오븐에 굽는 과정까지 직접 해보니 생각보다 재미있었습니다. 직접 만든 빵을 집에 가져와서 커피와 같이 먹으니 하루를 알차게 보낸 기분이었어요.",
                        "직접 만든 빵으로 마무리한 하루",
                        null,
                        null
                ),

                new HoloLounge(
                        1L,
                        "alstn11",
                        "혼자 서점에서 세 시간 보내기",
                        "책을 꼭 사야겠다는 생각 없이 동네 서점에 들렀다가 예상보다 오래 머물렀습니다.\n\n관심 있던 분야의 책을 몇 권 골라 천천히 읽어보고, 새로 나온 책들도 구경했어요.\n\n결국 마음에 드는 책 한 권을 사서 근처 카페에서 조금 읽다가 집에 돌아왔습니다.",
                        "여유롭게 책을 구경한 하루",
                        null,
                        null
                ),

                new HoloLounge(
                        2L,
                        "alstn11",
                        "처음 혼자 자전거 여행을 해봤어요",
                        "날씨가 좋아서 가까운 강변까지 자전거를 타고 다녀왔습니다.\n\n목적지를 정해놓고 달리기보다는 중간에 쉬고 싶은 곳이 있으면 멈추는 식으로 천천히 다녀왔어요.\n\n혼자 움직이니까 속도를 다른 사람에게 맞출 필요가 없어서 생각보다 편했습니다. 중간에 카페에 들러 음료를 마시면서 쉬었던 시간이 가장 기억에 남아요.",
                        "내 속도대로 즐긴 자전거 여행",
                        null,
                        null
                ),

                new HoloLounge(
                        3L,
                        "alstn11",
                        "저녁 산책으로 하루 마무리하기",
                        "요즘 집에만 있다 보니 몸도 무겁고 기분도 답답해서 저녁에 가볍게 산책을 나갔습니다.\n\n음악을 들으면서 천천히 걷다 보니 복잡했던 생각들이 조금씩 정리되는 느낌이었어요.\n\n멀리 가지 않고 집 주변을 30분 정도 걸었을 뿐인데 기분이 꽤 좋아졌습니다.",
                        "30분 산책으로 기분 전환하기",
                        null,
                        null
                ),

                new HoloLounge(
                        1L,
                        "alstn11",
                        "혼자 작은 공연을 보러 갔습니다",
                        "평소라면 같이 갈 사람을 먼저 찾았을 텐데 이번에는 그냥 혼자 예매하고 공연장에 갔어요.\n\n처음 입장할 때는 조금 어색했지만 막상 공연이 시작하니까 주변 사람들은 전혀 신경 쓰이지 않았습니다.\n\n오히려 공연에만 집중할 수 있어서 좋았어요. 좋아하는 공연이 있다면 한 번쯤 혼자 가보는 것도 추천하고 싶습니다.",
                        "혼자 공연을 즐겨본 후기",
                        null,
                        null
                ),

                new HoloLounge(
                        3L,
                        "alstn11",
                        "집에서 나만의 영화관 만들기",
                        "밖에 나가는 것도 좋지만 가끔은 집에서 편하게 쉬고 싶을 때가 있잖아요.\n\n그래서 이번에는 간단하게 간식을 준비하고 조명을 조금 어둡게 한 뒤 보고 싶었던 영화를 한 편 봤습니다.\n\n중간에 잠깐 멈춰도 되고 편한 자세로 볼 수 있다는 게 집에서 혼자 보는 가장 큰 장점인 것 같아요.",
                        "집에서 편하게 즐기는 영화 한 편",
                        null,
                        null
                ),

                new HoloLounge(
                        2L,
                        "alstn11",
                        "혼자 향수 만들기 체험 후기",
                        "평소 향수에 관심이 있었는데 이번에 처음으로 향수 만들기 체험을 해봤습니다.\n\n여러 가지 향을 직접 맡아보고 마음에 드는 향을 하나씩 조합하는 방식이었어요.\n\n생각보다 향마다 느낌이 크게 달라서 고르는 데 시간이 꽤 걸렸습니다. 완성된 향수를 직접 뿌려보니 내가 고른 향들이 하나로 어우러지는 게 신기했어요.",
                        "나만의 향수를 만들어본 하루",
                        null,
                        null
                ),

                new HoloLounge(
                        1L,
                        "alstn11",
                        "동네에서 발견한 작은 독립서점",
                        "집 근처를 산책하다가 우연히 작은 독립서점을 발견했습니다.\n\n규모는 크지 않았지만 일반 서점에서는 쉽게 보지 못했던 책들이 많아서 한참 구경했어요.\n\n책마다 주인의 추천 글이 붙어 있는 것도 재미있었습니다. 특별한 목적 없이 동네를 걷다가 이런 장소를 발견하니 괜히 여행을 온 것 같은 기분도 들었네요.",
                        "산책 중 발견한 새로운 공간",
                        null,
                        null
                ),

                new HoloLounge(
                        3L,
                        "alstn11",
                        "주말 아침 혼자 브런치 먹기",
                        "평소 주말에는 늦게 일어나서 대충 식사를 해결하는 편인데 이번에는 조금 일찍 일어나 근처 브런치 카페에 다녀왔어요.\n\n창가에 앉아서 천천히 식사를 하고 커피도 한 잔 마셨습니다.\n\n혼자 밥을 먹는 게 예전에는 조금 어색했는데 이제는 오히려 편하고 좋더라고요.",
                        "느긋하게 시작한 주말 아침",
                        null,
                        null
                ),

                new HoloLounge(
                        2L,
                        "alstn11",
                        "혼자 사진 찍으러 동네를 돌아다녀봤습니다",
                        "최근에 휴대폰 카메라로 사진 찍는 것에 재미가 생겨서 하루 동안 동네를 돌아다니며 사진을 찍어봤어요.\n\n평소에는 그냥 지나쳤던 골목이나 오래된 건물도 사진으로 찍어보니 새롭게 보였습니다.\n\n마음에 드는 사진을 찍기 위해 같은 장소를 몇 번씩 다시 보는 것도 재미있었어요.",
                        "평범한 동네를 새롭게 바라보기",
                        null,
                        null
                )
        };

        for (HoloLounge holoLounge : holoLounges) {
            holoLoungeRepository.save(holoLounge);
        }

        log.info("홀로라운지 테스트 게시글 {}개 저장 완료", holoLounges.length);
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
package com.holoday.api.hololoungeTest;

import com.holoday.api.hololounge.entity.HComment;
import com.holoday.api.hololounge.repository.HCommentRepository;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.data.jpa.test.autoconfigure.DataJpaTest;
import org.springframework.boot.jdbc.test.autoconfigure.AutoConfigureTestDatabase;
import org.springframework.test.annotation.Commit;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@Slf4j
public class HCommentRepositoryTests {

    @Autowired
    private HCommentRepository hCommentRepository;

    @Test
    @Commit
    public void testInsertDummyData() {

        HComment[] comments = {

                new HComment(
                        349L,
                        "alstn11",
                        "평소에 그냥 지나치던 곳도 사진을 찍으려고 보면 새롭게 보이는 것 같아요. 저도 한번 동네를 천천히 돌아다녀봐야겠네요."
                ),

                new HComment(
                        349L,
                        "alstn11",
                        "저도 요즘 사진 찍는 재미에 빠졌는데 공감돼요! 특히 오래된 골목이나 건물 찍는 게 은근히 재미있더라고요."
                ),

                new HComment(
                        349L,
                        "alstn11",
                        "사진 찍으려고 돌아다니다 보면 평소에는 몰랐던 예쁜 장소를 발견하게 되는 것 같아요. 좋은 취미인 것 같습니다!"
                ),

                new HComment(
                        349L,
                        "alstn11",
                        "같은 장소를 여러 번 보면서 사진을 찍는다는 부분이 인상적이네요. 저도 다음에 산책할 때 카메라를 들고 나가봐야겠어요."
                ),

                new HComment(
                        349L,
                        "alstn11",
                        "혼자 천천히 돌아다니면서 사진 찍는 거 정말 좋을 것 같아요. 다른 사람 신경 쓰지 않고 원하는 곳에서 마음껏 찍을 수 있을 것 같네요."
                ),

                new HComment(
                        349L,
                        "alstn11",
                        "평범한 동네도 사진으로 남겨두면 나중에 다시 봤을 때 좋은 추억이 될 것 같아요. 저도 동네 사진 한번 찍어봐야겠습니다."
                ),

                new HComment(
                        349L,
                        "alstn11",
                        "사진 찍으러 다니면서 산책까지 할 수 있으니 일석이조네요. 요즘 집에만 있었는데 저도 한번 나가봐야겠어요."
                ),

                new HComment(
                        349L,
                        "alstn11",
                        "저는 사진을 잘 못 찍어서 항상 그냥 지나쳤는데 글을 보니까 특별한 장소가 아니어도 충분히 재미있을 것 같아요."
                ),

                new HComment(
                        349L,
                        "alstn11",
                        "동네에 오래된 건물들이 생각보다 많이 남아 있더라고요. 사진으로 찍어두면 나중에는 더 의미 있는 기록이 될 것 같아요."
                ),

                new HComment(
                        349L,
                        "alstn11",
                        "저도 주말에 카메라 들고 동네 한 바퀴 돌아봐야겠어요. 평소와는 조금 다른 시선으로 보면 재미있을 것 같네요!"
                )
        };

        for (HComment comment : comments) {
            hCommentRepository.save(comment);
        }

        log.info("댓글 {}개 저장 완료", comments.length);
    }
}

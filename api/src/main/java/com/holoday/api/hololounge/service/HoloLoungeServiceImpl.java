package com.holoday.api.hololounge.service;

import com.holoday.api.common.pagination.PageRequestDTO;
import com.holoday.api.common.pagination.PageResponseDTO;
import com.holoday.api.hololounge.dto.HoloLoungeDTO;
import com.holoday.api.hololounge.entity.HoloLounge;
import com.holoday.api.hololounge.mapper.HoloLoungeMapper;
import com.holoday.api.hololounge.repository.HoloLoungeRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.apache.tomcat.util.bcel.classfile.EnumElementValue;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class HoloLoungeServiceImpl implements HoloLoungeService{
    private final HoloLoungeRepository holoLoungeRepository;
    private final HoloLoungeMapper holoLoungeMapper;

    private HoloLounge getLounge(Long no) {
        return holoLoungeRepository.findById(no)
                .orElseThrow(() ->
                        new EntityNotFoundException(no + "번 게시글이 존재하지 않습니다."));
    }

    @Override
    public Long register(HoloLoungeDTO holoLoungeDTO) {
        HoloLounge holoLounge = new HoloLounge(holoLoungeDTO.getCategoryNo(), holoLoungeDTO.getUserId(),
                holoLoungeDTO.getBoardTitle(),holoLoungeDTO.getBoardContent(),holoLoungeDTO.getBoardScontent(),
                holoLoungeDTO.getBoardImg(),holoLoungeDTO.getBoardSimg());
        HoloLounge saveHoloLounge = holoLoungeRepository.save(holoLounge);
        return saveHoloLounge.getBoardNo();
    }

    @Override
    public HoloLoungeDTO get(Long no) {
        HoloLounge holoLounge = getLounge(no);
        return holoLoungeMapper.toDTO(holoLounge);
    }

    @Override
    public void modify(HoloLoungeDTO holoLoungeDTO) {
        HoloLounge holoLounge = getLounge(holoLoungeDTO.getBoardNo());
        holoLounge.updateDate(holoLoungeDTO.getCategoryNo(), holoLoungeDTO.getBoardTitle(), holoLoungeDTO.getBoardContent(),
                holoLoungeDTO.getBoardScontent(), holoLoungeDTO.getBoardImg(), holoLoungeDTO.getBoardSimg());
    }

    @Override
    public void remove(Long no) {
        HoloLounge holoLounge = getLounge(no);
        holoLoungeRepository.delete(holoLounge);
    }

    @Transactional(readOnly = true)
    @Override
    public PageResponseDTO<HoloLoungeDTO> list(PageRequestDTO pageRequestDTO) {
        Pageable pageable = pageRequestDTO.getPageable("boardNo");
        Page<HoloLounge> holoLoungePage = holoLoungeRepository.findAll(pageable);

        List<HoloLoungeDTO> dtoList = holoLoungePage.getContent()
                .stream()
                .map(holoLoungeMapper::toDTO)
                .toList();

        return new PageResponseDTO<>(dtoList, pageRequestDTO, holoLoungePage.getTotalElements());
    }
}

package com.holoday.api.holoinfo.service;

import com.holoday.api.common.pagination.PageRequestDTO;
import com.holoday.api.common.pagination.PageResponseDTO;
import com.holoday.api.holoinfo.dto.InfoDTO;
import com.holoday.api.holoinfo.entity.Info;
import com.holoday.api.holoinfo.mapper.InfoMapper;
import com.holoday.api.holoinfo.repository.InfoRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class InfoServiceImpl implements InfoService {
    private final InfoRepository infoRepository;
    private final InfoMapper infoMapper;

    @Override
    public Long register(InfoDTO infoDTO){

        Info info = new Info(
                infoDTO.getUserId(),
                infoDTO.getCategoryNo(),
                infoDTO.getInfoTitle(),
                infoDTO.getInfoContent(),
                infoDTO.getInfoPlace(),
                infoDTO.getInfoAddress(),
                infoDTO.getInfoImg(),
                infoDTO.getInfoSimg()
                );

        Info savedInfo = infoRepository.save(info);
        return savedInfo.getInfoNo();
    }

    private Info getInfo(Long infoNo){
        return infoRepository.findById(infoNo)
                .orElseThrow(() ->
                        new EntityNotFoundException(infoNo+"번 게시글이 존재하지 않습니다."));
    }
    @Override
    public InfoDTO get (Long infoNo){
        Info info = getInfo(infoNo);
        return infoMapper.toDTO(info);
    }

    @Override
    public void modify(InfoDTO infoDTO){
        Info info = getInfo(infoDTO.getInfoNo());

        info.changeCategoryNo(infoDTO.getCategoryNo());
        info.changeInfoTitle(infoDTO.getInfoTitle());
        info.changeInfoContent(infoDTO.getInfoContent());
        info.changeInfoPlace(infoDTO.getInfoPlace());
        info.changeInfoAddress(infoDTO.getInfoAddress());

        //새로운 사진 있을때만 변경
        if (infoDTO.getInfoImg() != null) {
            info.changeInfoImg(infoDTO.getInfoImg());
            info.changeInfoSimg(infoDTO.getInfoSimg());
        }
    }

    @Override
    public void remove(Long infoNo){
        Info info = getInfo(infoNo);
        infoRepository.delete(info);
    }

    @Transactional(readOnly = true)
    @Override
    public PageResponseDTO<InfoDTO> list(PageRequestDTO pageRequestDTO){
        Pageable pageable = pageRequestDTO.getPageable("infoNo");
        Page<Info> infoPage = infoRepository.findAll(pageable);

        List<InfoDTO> dtoList = infoPage.getContent()
                .stream()
                .map(infoMapper::toDTO)
                .toList();
        return new PageResponseDTO<>(dtoList,pageRequestDTO,infoPage.getTotalElements());
    }
}

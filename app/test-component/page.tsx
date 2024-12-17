'use client';
import React, {useState} from 'react';
import {Box} from '@mui/material';
import Modal from '@/components/common/modal';
import Button from '@/components/common/Button';

const modalBoxStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'auto',
  height: 'auto',
  bgcolor: '#FFFFFF',
  p: 4,
  borderRadius: '16px',
};

export default function TestComponent() {
  const [modalStatus, setModalStatus] = useState<boolean>(false);

  const handleOpenModal = () => {
    setModalStatus(true);
  };

  return (
    <>
      Component 페이지 입니다.
      <br />
      <ul>
        <li>
          <Button style={{borderRadius: '9999px', backgroundColor: '#6A42DB'}} onClick={handleOpenModal}>
            Modal Open
          </Button>
          <Modal open={modalStatus} onClose={() => setModalStatus(false)}>
            <Box sx={modalBoxStyle}>모달 테스트입니다.</Box>
          </Modal>
        </li>
        <li>
          <div className="text-lg font-semibold">
            <p>폰트 테스트</p>
          </div>
          <div className="bg-gray-100 text-purple-100 text-lg font-medium">색상 테스트</div>
        </li>
      </ul>
    </>
  );
}

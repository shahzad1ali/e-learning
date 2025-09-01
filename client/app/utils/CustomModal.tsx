import React, { FC } from 'react';
import { Modal, Box } from '@mui/material';

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  activeItem: any;
  component: any;
  setRoute?: (route: string) => void;
  refetch?: any;
}

const CustomModal: FC<Props> = ({ open, setOpen, setRoute, component: Component }) => {
  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        className="
          absolute top-1/2 left-1/2 mt-4
          transform -translate-x-1/2 -translate-y-1/2 
          w-[90%] sm:w-[450px] 
          bg-white dark:bg-slate-900 
          rounded-[12px] shadow outline-none
          max-h-[90vh] overflow-y-auto
        "
      >
        {/* Modal content will scroll if it overflows */}
        <Component setOpen={setOpen} {...(setRoute && { setRoute })} />
      </Box>
    </Modal>
  );
};

export default CustomModal;

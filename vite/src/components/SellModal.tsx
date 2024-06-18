import { Dispatch, FC, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";

import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";

interface MintModalProps {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  nftMetadata?: NftMetadata;
}

const SellModal: FC<MintModalProps> = ({
  isModalOpen,
  setIsModalOpen,
  nftMetadata,
}) => {
  const navigate = useNavigate();

  return (
    <Transition show={isModalOpen}>
      <Dialog
        className="relative z-10"
        onClose={() => {
          setIsModalOpen(false);
          navigate("/mypage");
        }}
      >
        <TransitionChild
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </TransitionChild>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
            <TransitionChild
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-2 pt-5">
                  <div className="flex justify-center">
                    <div className="mt-3 flex flex-col justify-center">
                      <DialogTitle className="text-base font-semibold leading-6 text-secondary mx-auto">
                        Your Item has been listed!
                      </DialogTitle>
                      <div className="mt-2">
                        <img
                          src={nftMetadata?.image}
                          alt={nftMetadata?.name}
                          className="h-40 w-40 mx-auto mb-4"
                        />
                        <p className="text-sm text-secondary">
                          <span className="font-bold">{nftMetadata?.name}</span>{" "}
                          has been listed for sale. <br />
                          Click 'Continue' to move to My Page.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 pb-3 flex justify-center ">
                  <button
                    type="button"
                    className="mt-3 inline-flex mx-5 justify-center items-center rounded-md bg-white px-4 py-1 text-sm font-semibold shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    onClick={() => {
                      setIsModalOpen(false);
                      navigate("/mypage");
                    }}
                    data-autofocus
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex mx-5 justify-center items-center rounded-md bg-yellow-300 px-4 py-1 text-sm font-semibold shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-yellow-500"
                    onClick={() => {
                      setIsModalOpen(false);
                      navigate("/mypage");
                    }}
                  >
                    Continue
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default SellModal;

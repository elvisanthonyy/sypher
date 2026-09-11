"use client";
import { useState } from "react";
import ButtonIcon from "./admin/ButtonIcon";

interface ChildProps {
  title?: string;
  subTitle?: string;
  cancelButtonTitle?: string;
  actionButtonTitle?: string;
  api: () => void;
  isDeleteModalOpen: boolean;
  setIsDeleteModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal = ({
  api,
  isDeleteModalOpen,
  setIsDeleteModalOpen,
  title,
  subTitle,
  cancelButtonTitle,
  actionButtonTitle,
}: ChildProps) => {
  //toggle modal

  return (
    <div
      onClick={() => setIsDeleteModalOpen(false)}
      className={
        isDeleteModalOpen
          ? "bg-black/50 fixed z-40 inset-0 flex items-center justify-center"
          : "hidden"
      }
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white px-5 py-8 rounded-[16px] flex items-center justify-center flex-col gap-4 w-[90%] max-w-[400px]"
      >
        <ButtonIcon icon="/icons/delete-icon.svg" size={50} />
        <section className="flex flex-col text-center items-center gap-2 items-center w-full h-full">
          <h3 className="text-[18px] text-text tracking-[-2%] font-semibold ">
            {title ? title : " Delete Product!"}
          </h3>
          <p className="text-[14px] text-[#828282]">
            {subTitle
              ? subTitle
              : " Are you sure you want to delete this product from your website?"}{" "}
          </p>
        </section>

        <div className="flex w-full text-white text-[14px] justify-end gap-4">
          <button
            onClick={() => setIsDeleteModalOpen(false)}
            className="px-4 w-full py-2 h-[41px] bg-text rounded-[8px] hover:bg-gray-400"
          >
            {cancelButtonTitle ? cancelButtonTitle : "Cancel"}
          </button>
          <button
            onClick={api}
            className="px-4 w-full py-2 bg-primary-400 h-[41px] text-white rounded-[8px] hover:bg-red-600"
          >
            {actionButtonTitle ? actionButtonTitle : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;

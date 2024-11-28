import { Dispatch, MouseEventHandler, ReactNode, SetStateAction } from "react";

import { AlertColor } from "@mui/material";
import { GridColDef, GridPaginationModel, GridRowsProp } from "@mui/x-data-grid";
import { UseMutateAsyncFunction } from "@tanstack/react-query";

import GlobalTypes from "./globals";

namespace ComponentTypes {
  export interface DataStateProps {
    snackbarState?: { isOpen: boolean; message: string };
    isLoading: boolean;
    isSuccess: boolean;
  }

  export interface AppBarButtonProps {
    tooltip: string;
    icon: ReactNode;
    onClick?: MouseEventHandler<HTMLButtonElement>;
  }

  export interface AuthCheckProps {
    children: ReactNode;
  }

  export interface DataGridProps<TNew, TUpdate, TDelete> {
    rowsProp: GridRowsProp;
    columnsProp: GridColDef[];
    paginationModel?: GridPaginationModel;
    dataCategory: string;
    newDataObject: object;
    newDataFunction: UseMutateAsyncFunction<
      GlobalTypes.BackendResponseParams,
      Error,
      TNew,
      unknown
    >;
    updateDataFunction: UseMutateAsyncFunction<
      GlobalTypes.BackendResponseParams,
      Error,
      TUpdate,
      unknown
    >;
    deleteDataFunction: UseMutateAsyncFunction<
      GlobalTypes.BackendResponseParams,
      Error,
      TDelete,
      unknown
    >;
  }

  export interface FormHeaderProps {
    title: string;
    subtitle: string;
  }

  export interface GridOverlayProps {
    type: "loading" | "error";
    message?: string;
  }

  export interface LoadLanguageProps {
    children: ReactNode;
  }

  export interface MenuItemProps {
    icon: ReactNode;
    text: string;
    onClick?: () => void;
  }

  export interface ModalProps {
    open: boolean;
    onClose: () => void;
    title: string;
    children: ReactNode;
  }

  export interface SidebarTitleProps {
    text: string;
  }

  export interface SnackbarProps {
    snackbarState: DataStateProps;
    setSnackbarState: Dispatch<SetStateAction<DataStateProps>>;
    severity: AlertColor;
  }

  export interface SubmitButtonProps {
    isLoading: boolean;
    isSuccess: boolean;
  }

  export interface TranslatePopoverProps {
    anchor: HTMLButtonElement | null;
    // eslint-disable-next-line no-unused-vars
    setAnchor: (anchor: HTMLButtonElement | null) => void;
  }
}

export default ComponentTypes;

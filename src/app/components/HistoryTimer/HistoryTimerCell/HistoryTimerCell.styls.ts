import { colors } from "@/app/styles";
import styled from "styled-components";


export const HistoryTimerCellStyled = styled.div`
    .timer-body {
        &__row {
            display: flex;

            &.active {
                .timer-body__cell-timer {
                    font-weight: bold;
                }
            }
        }

        &__cell {
            padding: 30px;
            border: 1px solid ${colors.gray200};
            display: flex;
            align-items: center;
            border-top: unset;
            gap: 10px;

            &:first-child {
                flex-basis: 15%;
            }

            &:nth-of-type(2) {
                flex-basis: 60%;
                border-left: unset;
            }

            &:nth-of-type(3) {
                flex-basis: 15%;
                border-left: unset;
                border-right: unset;
            }

            &:last-child {
                flex-basis: 10%;
            }
        }
    }

    .timer-icon {
        background-repeat: no-repeat;
        width: 24px;
        height: 24px;
        cursor: pointer;
    }

    .timer-edit {
        background-image: url("/images/edit-icon.png");
    }

    .timer-delete {
        background-image: url("/images/delete-icon.png");
    }
`

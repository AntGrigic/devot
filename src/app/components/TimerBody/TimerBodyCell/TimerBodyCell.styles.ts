import { colors } from "@/app/styles";
import styled from "styled-components";


export const TimerBodyCellStyled = styled.div`
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
                flex-basis: 20%;
                flex-grow: 1;
            }

            &:nth-of-type(2) {
                flex-basis: 60%;
                border-left: unset;
                border-right: unset;
            }

            &:last-child {
                flex-basis: 20%;
            }
        }
    }

    .timer-icon {
        background-repeat: no-repeat;
        width: 24px;
        height: 24px;
        cursor: pointer;
    }

    .timer-play {
        background-image: url("/images/play-icon.png");
    }

    .timer-play.active {
        background-image: url("/images/pause-icon.png");
    }

    .timer-stop {
        background-image: url("/images/stop-icon.png");
    }

    .timer-edit {
        background-image: url("/images/edit-icon.png");
    }

    .timer-delete {
        background-image: url("/images/delete-icon.png");
    }
`

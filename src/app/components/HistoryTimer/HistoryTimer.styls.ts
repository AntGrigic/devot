import { colors } from "@/app/styles";
import styled from "styled-components";

export const HistoryTimerStyled = styled.div`
    .timer-container {
        display: flex;
        flex-direction: column;
        margin-top: 70px;
    }

    .timer-content {
        margin-top: 40px;
    }

    .timer-header {
        display: flex;
    }

    .timer-header__cell {
        background-color: ${colors.gray100};
        border: 1px solid ${colors.gray200};
        padding: 30px;
        display: flex;
        align-items: center;

        &-content {
            font-weight: 700;
            font-size: 1.125rem;
        }

        &:first-child {
            flex-basis: 15%;
            border-radius: 8px 0 0 0;
            border-right: unset;
        }

        &:nth-of-type(2) {
            flex-basis: 60%;
            border-left: unset;
            border-right: unset;
        }

        &:nth-of-type(3) {
            flex-basis: 15%;
            border-left: unset;
            border-right: unset;
        }

        &:last-child {
            flex-basis: 10%;
            border-radius: 0 8px 0 0;
            border-left: unset;
        }
    }

    .timer-body {
        > div:last-of-type {
            .timer-body__cell {
                &:first-child {
                    border-radius: 0 0 0 8px;
                }

                &:last-child {
                    border-radius: 0 0 8px 0;
                }
            }
        }
    }
`
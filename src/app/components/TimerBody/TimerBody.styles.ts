import { colors } from "@/app/styles";
import styled from "styled-components";

export const TimerBodyStyled = styled.div`
    .timer-container {
        display: flex;
        flex-direction: column;
        margin-top: 70px;
    }

    .timer-buttons {
        align-self: flex-end;
        display: flex;
        gap: 15px;
        position: relative;

        .btn {
            cursor: pointer;
            display: flex;
            align-items: center;
            padding: 10px 20px 10px 10px;

            &::before {
                content: '';
                background-repeat: no-repeat;
                width: 24px;
                height: 24px;
                display: inline-block;
                margin-right: 10px;
            }
        }

        &__new {
            &::before {
                background-image: url('/images/timer-icon.png');
            }

            &:hover::before {
                filter: invert(42%) sepia(98%) saturate(2335%) hue-rotate(346deg) brightness(100%) contrast(103%);
            }
        }

        &__stop {
            &::before {
                background-image: url('/images/stop-button.png');
            }

            &:hover::before {
                filter: invert(100%) sepia(74%) saturate(724%) hue-rotate(234deg) brightness(110%) contrast(97%);
            }
        }
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
            flex-basis: 20%;
            border-radius: 8px 0 0 0;
            border-right: unset;
        }

        &:nth-of-type(2) {
            flex-basis: 60%;
            border-left: unset;
            border-right: unset;
        }

        &:last-child {
            flex-basis: 20%;
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
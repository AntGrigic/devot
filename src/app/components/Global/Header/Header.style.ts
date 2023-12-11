import { colors } from '@/app/styles';
import styled from 'styled-components';

export const HeaderStyled = styled.header`
    display: flex;
    padding: 0 45px;
    background-color: ${colors.primary};
    border-radius: 0 0 22px 22px;
    justify-content: space-between;

    .header__logo {
        display: flex;
        padding: 25px 0;
    }

    .header__title {
        font-size: 1.375rem;
        color: white;
        font-weight: 700;
        display: flex;
        align-items: flex-end;
        margin-bottom: 6px;
        margin-left: 10px;
    }

    .header__navigation {
        display: flex;
        align-items: center;

        &-list {
            display: flex;

            &-item {
                position: relative;
                display: flex;
                align-items: center;

                a {
                    color: ${colors.gray300};
                    font-size: 0.935rem;
                    font-weight: 600;
                    text-decoration: none;
                    padding: 39px 30px 39px 76px;
                    z-index: 1;
                }

                &:hover {
                    a {
                        color: white;
                    }

                    &::after {
                        border-bottom: 5px solid ${colors.secondary};
                    }

                    &.tracker-icon:before {
                        background-image: url("/images/tracker-icon-white.svg");
                    }

                    &.history-icon:before {
                        background-image: url("/images/history-icon-white.svg");
                    }
                }

                &::after {
                    content: '';
                    position: absolute;
                    border-bottom: 5px solid ${colors.gray300};
                    bottom: -2px;
                    left: 0;
                    width: 100%;
                    transition: border-bottom 0.5s;
                }

                &:first-child::after {
                    border-radius: 50px 0 0 50px;
                }

                &:last-child::after {
                    border-radius: 0 50px 50px 0;
                }

                &.active {
                    a {
                        color: white;
                    }

                    &.tracker-icon:before {
                        background-image: url("/images/tracker-icon-white.svg");
                    }

                    &.history-icon:before {
                        background-image: url("/images/history-icon-white.svg");
                    }

                    &::after {
                        border-bottom: 5px solid ${colors.secondary};
                    }
                }
            }

            &-logout {
                position: relative;
                display: flex;
                align-items: center;

                a {
                    color: ${colors.gray300};
                    font-size: 0.935rem;
                    font-weight: 600;
                    text-decoration: none;
                    padding: 39px 30px 39px 76px;
                    z-index: 1;
                }

                &:hover {
                    a {
                        color: white;
                    }

                    &.logout-icon:before {
                        background-image: url("/images/logout-icon-white.svg");
                    }
                }
            }
        }
    }

    .tracker-icon:before {
        content: '';
        background-image: url("/images/tracker-icon-gray.svg");
        width: 24px;
        height: 24px;
        display: inline-flex;
        position: absolute;
        left: 40px;
        z-index: 0;
    }

    .history-icon:before {
        content: '';
        background-image: url("/images/history-icon-gray.svg");
        width: 24px;
        height: 24px;
        display: inline-flex;
        margin-right: 8px;
        position: absolute;
        left: 40px;
        z-index: 0;
    }

    .logout-icon:before {
        content: '';
        background-image: url("/images/logout-icon-gray.svg");
        width: 24px;
        height: 24px;
        display: inline-flex;
        margin-right: 8px;
        position: absolute;
        left: 40px;
        z-index: 0;
    }
`

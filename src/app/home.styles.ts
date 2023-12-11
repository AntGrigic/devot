import styled from "styled-components";

export const HomeStyled = styled.section`
    position: relative;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    max-width: 700px;
    height: calc(100vh - 93px);
    overflow-x: hidden;

    &.test {
        section {
            &:first-child {
                left: -100%;
            }

            &:last-child {
                right: 25%;
            }
        }
    }

    section {
        position: absolute;
        transition: left 1s, right 1s;

        &:first-child {
            left: 25%;
        }

        &:last-child {
            right: -100%;
        }
    }
`

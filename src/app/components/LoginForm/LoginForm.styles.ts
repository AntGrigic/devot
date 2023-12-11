import { colors } from "@/app/styles";
import styled from "styled-components";

export const LoginFormStyled = styled.section`
    display: flex;
    flex-direction: column;
    gap: 30px;
    max-width: 400px;
    width: 100%;
    margin: 154px auto 0;

    .form__login {
        display: flex;
        flex-direction: column;
        align-items: center;
        border-radius: 5px;
        background-color: ${colors.gray100};
        border: 1px solid ${colors.gray200};
        padding-bottom: 60px;

        &--title {
            padding-top: 45px;
            padding-bottom: 45px;
            color: black;
            font-size: 1.375rem;
            font-weight: 700;
        }
    }

    .form__input {
        border: none;
        border-radius: 3px;
        background-color: white;
        max-width: 290px;
        width: 100%;
        padding: 12px 20px;
        font-size: 1.125rem;
        color: ${colors.secondary};
        cursor: pointer;

        &::placeholder {
            color: ${colors.lynch};
        }

        &:nth-of-type(1) {
            margin-bottom: 30px;
        }

        &--container {
            position: relative;
            margin: 0 auto;
            max-width: 330px;
            width: 100%;
        }

        &--password {
            margin-bottom: 50px;
            padding-right: 30px;

            &-toggle {
                background-image: url('/images/closedEye.png');
                display: inline;
                width: 20px;
                height: 20px;
                position: absolute;
                right: 10px;
                top: calc(50% - 15px);
                transform: translateY(-50%);
                cursor: pointer;

                &.show {
                    background-image: url('/images/openEye.png');
                }
            }
        }
    }

    .form__new {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 10px 0;
        border-radius: 5px;
        background-color: ${colors.gray100};
        border: 1px solid ${colors.gray200};
        position: relative;

        img {
            position: relative;
            bottom: -10px;
            left: -40px;
        }

        &--register {
            display: flex;
            flex-direction: column;
        }

        &--text {
            font-size: 1.125rem;
            font-weight: 600;
            color: ${colors.lynch};
            margin-bottom: 10px;
            margin-top: 10px;
        }

        &--highlighted-text {
            color: ${colors.secondary};
            text-decoration: underline;
            font-size: 0.875rem;
            font-weight: 700;
            cursor: pointer;
        }
    }

    .btn {
        max-width: 330px;
        width: 100%;
        cursor: pointer;
    }
`
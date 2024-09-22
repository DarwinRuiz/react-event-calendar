import { useEffect, useMemo, useState } from 'react';


export const useForm = <T>(initialForm: T, formValidators: { [key: string]: [(value: string) => boolean, string] } = {}): any => {

    const [formState, setFormState] = useState<any>(initialForm);
    const [formValidation, setFormValidation] = useState<any>({});

    useEffect(() => {
        createValidators();
    }, [formState]);


    useEffect(() => {
        setFormState(initialForm);
    }, [initialForm]);

    const isFormValid = useMemo(() => {

        for (const formValue of Object.keys(formValidation)) {
            if (formValidation[formValue] !== null) return false;
        }

        return true;
    }, [formValidation]);

    const onInputChange = ({ target }: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = target;
        setFormState({
            ...formState,
            [name]: value
        });
    };

    const onResetForm = (): void => {
        setFormState(initialForm);
    };


    const createValidators = (): void => {
        const formCheckValues: any = {};

        for (const formField of Object.keys(formValidators)) {
            const [validationFunction, errorMessage] = formValidators[formField];
            formCheckValues[`${formField}Valid`] = validationFunction(formState[formField]) ? null : errorMessage;
        }

        setFormValidation(formCheckValues);
    };

    return {
        ...formState,
        ...formValidation,
        formState,
        isFormValid,
        onInputChange,
        onResetForm,
    };
};
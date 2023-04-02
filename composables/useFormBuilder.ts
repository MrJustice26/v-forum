import { NForm, NFormItem, NInput, NButton, FormItemRule } from 'naive-ui'
import { useVuelidate } from '@vuelidate/core'

interface FormFieldValidation {
    type: string
    message?: string
}

interface FormField {
    id: string
    label: string
    type?: 'text' | 'textarea' | 'password'
    defaultValue?: string
    placeholder?: string
}

interface FormBuilderOptions {
    title: string
    className?: string
    onSubmit: Function
    fields: FormField[]
    rules?: {}
}

interface FormValues {
    [key: string]: string
}

export const useFormBuilder = (options: FormBuilderOptions) => {
    const formValues = reactive<FormValues>({})
    for (const field of options.fields) {
        formValues[field.id] = field.defaultValue || ''
    }
    const rules = {
        password: [
            {
                required: true,
                message: 'Password is required',
            },
        ],
    }
    const v$ = useVuelidate(options.rules || {}, formValues)

    const formFields = options.fields.map((formField) => {
        return h(
            NFormItem,
            {
                label: formField.label,
                feedback: v$.value[formField.id]?.$errors[0]?.$message,
            },
            () => [
                h(NInput, {
                    placeholder: formField.placeholder || '',
                    type: formField.type,
                    id: formField.id,
                    value: formValues[formField.id],
                    status: v$.value[formField.id]?.$error
                        ? 'error'
                        : 'success',
                    onInput: (inputValue) => {
                        formValues[formField.id] = inputValue
                    },
                }),
            ]
        )
    })
    return h(
        NForm,
        {
            onSubmit: (event) => {
                event.preventDefault()
                v$.value.$validate()
                options.onSubmit()
            },
            class: options.className ? options.className : '',
            model: formValues,
            rules,
        },
        () => [
            ...formFields,
            h(
                NButton,
                { attrType: 'submit', tertiary: true, type: 'success' },
                'Register'
            ),
        ]
    )
}

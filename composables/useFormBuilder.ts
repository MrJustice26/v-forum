import { NForm, NFormItem, NInput, NButton, FormInst } from 'naive-ui'

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
    const rules = options?.rules || {}
    const formRef = ref<FormInst | null>(null)

    const formFields = options.fields.map((formField) => {
        return h(
            NFormItem,
            {
                label: formField.label,
                path: formField.id,
            },
            () => [
                h(NInput, {
                    placeholder: formField.placeholder || '',
                    type: formField.type,
                    value: formValues[formField.id],

                    onInput: (inputValue) => {
                        formValues[formField.id] = inputValue
                    },
                }),
            ]
        )
    })
    return () =>
        h(
            NForm,
            {
                class: options.className ? options.className : '',
                model: formValues,
                rules,
                ref: formRef,
                onSubmit: (event) => {
                    event.preventDefault()
                    formRef.value?.validate((errors) => {
                        console.log(errors)
                    })
                    options.onSubmit()
                },
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

import {
    NForm,
    NFormItem,
    NInput,
    NButton,
    FormInst,
    NH1,
    FormItemRule,
} from 'naive-ui'

interface FormFieldValidationRule {
    required: boolean
    message: string
    trigger: string[]
    sameAs?: string
}

interface FormFieldRules {
    [fieldId: string]: FormFieldValidationRule[]
}

interface FormField {
    id: string
    label: string
    type?: 'text' | 'textarea' | 'password'
    defaultValue?: string
    placeholder?: string
}

interface FormActionBtn {
    text: string
    attrType: 'submit' | 'reset'
    type: string
}

interface FormFieldRule {
    required?: boolean
    message: string
    trigger?: string | ('input' | 'blur')[]
    validator?(_: FormItemRule, value: string): boolean
}

interface FormRules {
    [formFieldName: string]: FormFieldRule[]
}

interface FormBuilderOptions {
    title: string
    className?: string
    onSubmit: Function
    fields: FormField[]
    rules?: FormFieldRules | {}
    actions?: FormActionBtn[]
}

interface FormValues {
    [key: string]: string
}

export const useFormBuilder = (options: FormBuilderOptions) => {
    const formValues = reactive<FormValues>({})
    for (const field of options.fields) {
        formValues[field.id] = field.defaultValue || ''
    }
    const rules = ref(options?.rules || {})

    const defaultActions: FormActionBtn[] = [
        {
            text: 'Submit',
            attrType: 'submit',
            type: 'success',
        },
        {
            text: 'Reset',
            attrType: 'reset',
            type: 'error',
        },
    ]
    // TODO: Fix button type error
    const defaultActionsToComponents = defaultActions.map((actionData) => {
        return h(
            NButton,
            {
                attrType: actionData.attrType,
                type: actionData.type,
                tertiary: true,
            },
            actionData.text
        )
    })

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
    return {
        component: () =>
            h(
                NForm,
                {
                    class: options.className ? options.className : '',
                    model: formValues,
                    rules: rules.value,
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
                    h(NH1, {}, options.title),
                    ...formFields,
                    ...defaultActionsToComponents,
                ]
            ),
        values: formValues,
        setRules: (newRules: FormRules): void => {
            rules.value = newRules
        },
    }
}

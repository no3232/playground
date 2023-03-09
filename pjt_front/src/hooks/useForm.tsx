import React, { useState, useEffect, useCallback } from "react"

function useForm({ initialValues, validate, onSubmit }: any) {
    const [values, setValues] = useState(initialValues)
    const [errors, setErrors] = useState({})
    const [touched, setTouched] = useState({})
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setValues({
        ...values,
        [e.target.name]: e.target.value,
      })
    }
  
    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setTouched({
        ...touched,
        [e.target.name]: true,
      })
    }
  
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
  
      // 모든 필드에 방문했다고 표시한다
      setTouched(
        Object.keys(values).reduce(({touched, field}: any) => {
          touched[field] = true
          return touched
        }, {})
      )
  
      const errors = validate(values)
      setErrors(errors)
      if (Object.values(errors).some(v => v)) {
        return
      }
  
      // useForm의 폼 제출을 완료하고 사용하는 쪽으로 알린다
      onSubmit(values)
    }
  
    // 입력값에 따라 검증 함수를 실행하는 함수를 정의한다
    const runValidator = useCallback(() => validate(values), [values])
  
    useEffect(() => {
      const errors = runValidator()
      setErrors(errors)
    }, [runValidator])
  
    // 훅을 사용하는 쪽에 제공하는 api다
    return {
      values,
      errors,
      touched,
      handleChange,
      handleBlur,
      handleSubmit,
    }
  }
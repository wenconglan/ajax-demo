let $form = $('#signUpForm')
let hash = {}
$form.on('submit', e => {
  e.preventDefault()
  let need = ['email', 'password', 'password_confirmation']
  need.forEach(name => {
    hash[name] = $form.find(`[name=${name}]`).val()
  })
  $form.find('.error').each((index, span) => {
    $(span).text('')
  })
  if (hash['email'] === '') {
    $form
      .find('[name="email"]')
      .siblings('.error')
      .text('请填写邮箱')
    return
  }
  if (hash['password'] === '') {
    $form
      .find('[name="password"]')
      .siblings('.error')
      .text('请填写密码')
    return
  }
  if (hash['password_confirmation'] === '') {
    $form
      .find('[name="password_confirmation"]')
      .siblings('.error')
      .text('请填写确认密码')
    return
  }
  if (hash['password'] !== hash['password_confirmation']) {
    $form
      .find('[name="password_confirmation"]')
      .siblings('.error')
      .text('确认密码不匹配')
    return
  }
  $.post('/sign_up', hash).then(
    () => {
      console.log('success')
    },
    request => {
      let { errors } = request.responseJSON
      if (errors.email && errors.email === 'invalid') {
        $form
          .find('[name="email"]')
          .siblings('.error')
          .text('邮箱格式错误')
      }
    }
  )
})

class UserMailer < ApplicationMailer
  default from: "truphenaokenye@gmail.com"

  def confirmation_email(user)
    @user = user
    mail(to: @user.email, subject: 'Email Confirmation')
  end
end

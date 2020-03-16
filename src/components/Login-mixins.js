export default {
    data() {
        return {
          loginForm: {
            username: "admin",
            password: "123456"
          },
          LoginRules: {
            username: [
              { required: true, message: "请输入用户名", trigger: "blur" }
            ],
            password: [{ required: true, message: "请输入密码", trigger: "blur" }]
          }
        };
      },
      methods: {
        resetLogin() {
          this.$refs.LoginFormRef.resetFields()
        },
        login() {
            this.$refs.LoginFormRef.validate(async valid => {
                if (!valid) return
                const {data: res} = await this.$http.post('/login', this.loginForm)
                console.log(res)
                if (res.meta.status !== 200) return this.$message.error('登录失败!')
                this.$message.success('登录成功!')
                window.sessionStorage.setItem('token', res.data.token)
                this.$router.push('/home')
            })
        }
    }
}
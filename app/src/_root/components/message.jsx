
        <Layer
          full
          margin="xlarge"
          position="center"
          modal
          onClickOutside={() => showModal(false)}
        >
          <Form>
            <Box pad="medium">
              <FormField name="name" label="Full Name" />
              <FormField name="email" label="Email Address" />
              <FormField name="message" label="Your Message" />
              <SubmitButton
                type="submit"
                primary
                icon={<Send />}
                label="Submit"
              />
            </Box>
          </Form>
        </Layer>

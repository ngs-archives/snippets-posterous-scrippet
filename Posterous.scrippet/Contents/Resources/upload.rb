$:[0,0] = './lib'
require 'preposterous'

client     = Preposterous::HTTPAuth.new(ENV['POSTEROUS_LOGIN_EMAIL'], ENV['POSTEROUS_LOGIN_PASSWORD'])
posterous  = Preposterous::Base.new(client)
is_private = ENV['POSTEROUS_IS_PRIVATE'] == '1'
autopost   = !is_private && ENV['POSTEROUS_AUTOPOST'] == '1'
source     = ENV['SNIPPET_RELATED_URL']

fields = {
  :site_id    => ENV['POSTEROUS_SITE_ID'],
  :title      => ENV['SNIPPET_NAME'],
  :body       => ENV['SNIPPET_SOURCE_CODE'],
  :tags       => ENV['SNIPPET_LABELS'],
  :private    => is_private,
  :autopost   => autopost
}

if source && source != ''
  fields = fields.merge({
    :source => source
  })
else
  fields = fields.merge({
    :source => 'Snippets'
  })
end

res = posterous.newpost(fields)

puts res
puts res['url']

exit

=begin
# perform the actual post



:title        => String < the post title >,
:body         => String < the post body >,
:tags         => String < comma delimited tags >,
:autopost     => Boolean < should autopost to external sites >
:display_date => Date < Date for the post >
:source       => String < The name of your application or website >
:is_private   => Boolean < Privacy setting for the post >


=end
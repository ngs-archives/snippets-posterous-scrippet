$:[0,0] = './lib'
require 'get_json'

is_private = ENV['POSTEROUS_IS_PRIVATE'] == '1'
autopost   = !is_private && ENV['POSTEROUS_AUTOPOST'] == '1'
source     = ENV['SNIPPET_RELATED_URL']
site_id    = ENV['POSTEROUS_SITE_ID']

fields = {
  :title      => ENV['SNIPPET_NAME'],
  :body       => ENV['SNIPPET_SOURCE_CODE'],
  :tags       => ENV['SNIPPET_LABELS'],
  :autopost   => autopost,
  :private => is_private,
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

puts "Posting snippet: #{ENV['SNIPPET_NAME']}"
res = post( site_id, fields )
ENV['POSTEROUS_SNIPPET_URL'] = res['full_url']

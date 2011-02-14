require "json/pure"
require 'net/http'
require 'uri'

def get_json( url, data )
  url  = URI.parse("http://posterous.com/api/2/#{url}")
  http = Net::HTTP.new(url.host, url.port)
  if data
    req  = Net::HTTP::Post.new(url.path)
    req.body = data
    req.content_type = 'application/x-www-form-urlencoded'
  else
    req  = Net::HTTP::Get.new(url.path)
  end
  req.basic_auth( email, password )
  res = http.request(req)
  JSON.parse(res.body)
end

def email
  ENV['POSTEROUS_LOGIN_EMAIL']
end

def password
  ENV['POSTEROUS_LOGIN_PASSWORD']
end

def get_token
  json = get_json( 'auth/token', nil )
  json['api_token']
end

def get_sites
  get_json('users/me/sites', nil )
  
end

def post ( site_id, data )
  res = get_json( "users/me/sites/#{site_id}/posts", "#{enum_to_query(data)}&api_token=#{get_token}&" )
  get_post( site_id, res['id'] )
end

def get_post ( site_id, id )
  get_json( "users/me/sites/#{site_id}/posts/#{id}", nil )
end

def enum_to_query ( data ) 
  data.map {|k,v| "post[#{urlencode(k.to_s)}]=#{urlencode(v.to_s)}" }.join('&')
end

def urlencode(str)
  str.gsub(/[^a-zA-Z0-9_\.\-]/n) {|s| sprintf('%%%02x', s[0]) }
end
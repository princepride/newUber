from googleplaces import GooglePlaces
import googlemaps
import sys
import importlib
import json
importlib.reload(sys)
class GoogleMaps(object):

    """ Default language and location as English and Signapore """
    
    language = 'English'
    location = 'Singapore'


    def __init__(self):
        """ 
        use google maps API 
        
        """
        self._GOOGLE_MAPS_KEY = "AIzaSyD9mB-Qh_64h3bWyAVyfHjlTVkg9AuN-mI"
        self._Google_Places = GooglePlaces(self._GOOGLE_MAPS_KEY)
        self._Google_Geocod = googlemaps.Client(key=self._GOOGLE_MAPS_KEY)
    

    def obtain_lat_lng(self, query, language=language, location=location):

        """
        according the searched str, use google API to return the recommanded list
        :param query: drop-off location
        :param language
        :param location
        :return:
        
        """
        text_query_result = self._Google_Places.text_search(query=query, language=language, location=location)

        return text_query_result.places

    def obtain_location_list(self, lat, lng, language=language):
        """
        according the lat, lng, use google API to obtain the coordinate message and return it
        :param lat: latitude
        :param lng: longitude
        :param language
        :return:

        """

        list_reverse_geocode_result = self._Google_Geocod.reverse_geocode((lat, lng), language=language)
        
        return list_reverse_geocode_result


    def organize_info(self, lat, lng, language=language):
        
        """
        organize information
        :param lat
        :param lng
        :param language

        """

        list_reverse_geocode = self.obtain_location_list(lat, lng, language=language)
        
        if list_reverse_geocode:
            postcode = ''
            route = ''
            neighborhood = ''
            street_number = ''
            # return full name address
            formatted_address = list_reverse_geocode[0]['formatted_address']
            
            for address_info in list_reverse_geocode[0]['address_components']:
                
                # postcode
                if 'postal_code' in address_info['types']:
                    postcode = address_info['long_name']
                # route
                elif 'route' in address_info['types']:
                    route = address_info['long_name']
                # similar address
                elif 'neighborhood' in address_info['types']:
                    neighborhood = address_info['long_name']
                # street number
                elif 'street_number' in address_info['types']:
                    street_number = address_info['long_name']
            return {
                    'postcode': postcode, 
                    'route': route, 
                    'neighborhood': neighborhood,
                    'formatted_address': formatted_address, 
                    'street_number': street_number
                    }
        else:
            return None
        
    
    def obtain_postcode(self, lat, lng, language=language):
        
        """
        obtain postcode
        :param lat:
        :param lng: 

        """
        reverse_geocode_info = self.organize_info(lat, lng, language=language)
        
        if reverse_geocode_info:
            return {
                    'pincode': reverse_geocode_info['pincode']
                    }
        else:
            return None
    
    def obtain_address_recommendation(self, query, language=language, location=location):
        
        """
        according to the drop-off address, obtain the recommended address (max: 3)
        :param query: drop-off address
        :param language: 
        :param location: 

        """
        return_maxsize = 3
        list_return_info = list()
        list_places_text_search_result = self.obtain_lat_lng(query=query, language=language, location=location)
        
        # return 3 address

        if len(list_places_text_search_result) > return_maxsize:
            list_places_text_search_result = list_places_text_search_result[:return_maxsize]
        
        for place in list_places_text_search_result:
            
            result_geocode = self.organize_info(place.geo_location['lat'], place.geo_location['lng'], language=language)

            if result_geocode:

                # add full name address

                result_geocode['formatted_address'] = '{} {}'.format(place.name, result_geocode['formatted_address'])
                result_geocode['place_name'] = place.name
                
                # obtain lat,lng

                # result_geocode['lat'] = '{}'.format(place.geo_location['lat'])
                # result_geocode['lng'] = '{}'.format(place.geo_location['lng'])
                # print(float(place.geo_location['lat']))
                
                list_return_info.append(result_geocode)
        
        return list_return_info
